import os
import sys
import re
import datetime
import threading
import time
import tkinter as tk
from tkinter import ttk
import tkinter.messagebox as messagebox
import webbrowser
import pvzall  # 假设这是你的模块，确保已正确导入
import inspect
from datetime import timedelta
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import ParseError
import ast

quality_map = {
    '劣质': 1,
    '普通': 2,
    '优秀': 3,
    '精良': 4,
    '极品': 5,
    '史诗': 6,
    '传说': 7,
    '神器': 8,
    '魔王': 9,
    '战神': 10,
    '至尊': 11,
    '魔神': 12,
    '耀世': 13,
    '不朽': 14,
    '永恒': 15,
    '太上': 16,
    '混沌': 17,
    '无极': 18
    }

# 累计掉落道具全局字典 {tool_id: amount}
total_dropped_items = {}

# 更新道具数量
def update_item_count(daqu, ck):
    player_item_count_list = pvzall.Analyze_Warehouse_Data(daqu, ck, "tool", None)  # 玩家道具数量列表
    if player_item_count_list == "跳过":
        return 0
    # 转成字典
    player_item_count_dict = dict(player_item_count_list)
    return player_item_count_dict.get("16", 0)


def friends_data(player_data, daqu, ck):
    player_grade_friends_list = player_data[16]  # 玩家好友列表
    count = sum(int(sublist[2]) > 118 for sublist in player_grade_friends_list)  # 玩家百级好友数量
    frident_max = player_data[24]  # 好友总数量

    if int(player_data[25]) > 1:
        for i_p in range(2, int(player_data[25]) + 1):
            if int(daqu) > 12:
                url = f"http://s{daqu}.youkia.pvz.youkia.com/pvz/index.php/user/friends/page/{str(i_p)}/sig"
            else:
                url = f"http://pvz-s{daqu}.youkia.com/pvz/index.php/user/friends/page/{str(i_p)}/sig"

            try:
                # 获取页面数据并增强跳过判断
                page_counts_txt = pvzall.GET_TXT(url, daqu, ck)

                # 处理各种可能的异常返回情况
                if (page_counts_txt == "跳过" or
                        not isinstance(page_counts_txt, (list, tuple)) or
                        len(page_counts_txt) < 2):
                    return "跳过"

                xml_content = page_counts_txt[1]
                if not isinstance(xml_content, str) or len(xml_content.strip()) == 0:
                    return "跳过"

                # 解析XML并处理可能的错误
                root = ET.fromstring(xml_content)
                items = root.findall('.//item')
                count_add = sum(1 for item in items if int(item.get('grade', 0)) > 100)
                count += count_add

            except Exception:
                return "跳过"

    friends_value = f'{count}/{frident_max}'
    return friends_value


# ------------------------------ 植物管理窗口 ------------------------------ #
class PlantManagerWindow:
    def __init__(self, user_info, main_app=None):
        self.user_info = user_info
        self.main_app = main_app
        self.daqu = user_info.get("daqu", "")
        self.ck = user_info.get("ck", "")
        self.username = user_info.get("name", "")
        
        # 排序状态
        self.sort_column = None
        self.sort_reverse = False
        self.plant_data_list = []  # 存储植物数据
        
        # 百次刷品控制状态
        self.brush_pack_running = False
        self.stop_brush_pack_event = threading.Event()
        
        # 判断刷品控制状态
        self.brush_running = False
        self.stop_brush_event = threading.Event()
        
        # 进化控制状态
        self.upgrade_running = False
        self.stop_upgrade_event = threading.Event()
        
        # 带级控制状态
        self.leveling_running = False
        self.stop_leveling_event = threading.Event()
        
        # 合成控制状态
        self.synthesis_running = False
        self.stop_synthesis_event = threading.Event()
        
        # 创建主窗口
        self.root = tk.Toplevel()
        self.root.title(f"植物管理 - {self.username}")
        self.root.geometry("1000x700")
        
        # 右键菜单 - 在__init__中创建，确保不会被垃圾回收
        self.table_menu = tk.Menu(self.root, tearoff=0)
        self.table_menu.add_command(label="学习技能", command=self.learn_skill)
        self.table_menu.add_command(label="遗忘技能", command=self.forget_skill)
        self.table_menu.add_command(label="升级技能", command=self.upgrade_skill)
        self.table_menu.add_separator()
        self.table_menu.add_command(label="刷新植物数据", command=self.load_plant_data)
        
        self.setup_ui()
    
    def setup_ui(self):
        main_frame = ttk.Frame(self.root)
        main_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # ---------------------- 水平布局：左边表格，右边分页 ----------------------
        h_frame = ttk.Frame(main_frame)
        h_frame.pack(fill=tk.BOTH, expand=True)
        
        # 左边：植物列表表格（占四分之一宽度）
        left_frame = ttk.Frame(h_frame)
        left_frame.pack(side=tk.LEFT, fill=tk.BOTH)
        left_frame.config(width=400)  # 设置固定宽度
        left_frame.pack_propagate(False)  # 防止内容撑开框架
        
        table_frame = ttk.Frame(left_frame)
        table_frame.pack(fill=tk.BOTH, expand=True)
        
        # Table 
        self.table = ttk.Treeview(table_frame, show="headings", selectmode="extended")
        headers = ["序号", "植物ID", "植物名字", "植物等级", "植物品质", "植物HP", 
                   "植物攻击", "植物护甲", "植物穿透", "植物闪避", "植物命中", "植物战力"] 
        self.table["columns"] = headers
        for col in headers:
            self.table.heading(col, text=col, command=lambda c=col: self.sort_by_column(c))
            self.table.column(col, width=80, anchor=tk.CENTER)
        
        # 垂直滚动条
        table_v_scroll = ttk.Scrollbar(table_frame, orient=tk.VERTICAL, command=self.table.yview)
        self.table.configure(yscrollcommand=table_v_scroll.set)
        
        # 水平滚动条
        table_h_scroll = ttk.Scrollbar(table_frame, orient=tk.HORIZONTAL, command=self.table.xview)
        self.table.configure(xscrollcommand=table_h_scroll.set)
        
        self.table.grid(row=0, column=0, sticky="nsew")
        table_v_scroll.grid(row=0, column=1, sticky="ns")
        table_h_scroll.grid(row=1, column=0, sticky="ew")
        
        table_frame.columnconfigure(0, weight=1)
        table_frame.rowconfigure(0, weight=1)
        
        # 绑定右键事件（兼容不同系统）
        self.table.bind("<Button-3>", self.on_right_click)  # Windows/Linux右键
        self.table.bind("<Button-2>", self.on_right_click)  # 某些Linux系统
        self.table.bind("<Control-Button-1>", self.on_right_click)  # Mac上Ctrl+左键
        
        # 框选支持
        self.table.bind("<B1-Motion>", self.on_table_drag)
        self._selection_start = None
        
        # ---------------------- 主力植物和炮灰植物列表 ----------------------
        plant_lists_frame = ttk.Frame(left_frame)
        plant_lists_frame.pack(fill=tk.X, pady=5)
        
        # 主力植物列表
        main_plant_frame = ttk.Frame(plant_lists_frame)
        main_plant_frame.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=2)
        
        ttk.Label(main_plant_frame, text="主力植物").pack(anchor=tk.W)
        self.main_plant_list = tk.Listbox(main_plant_frame, height=8, selectmode=tk.SINGLE)
        self.main_plant_list.pack(fill=tk.X, pady=2)
        ttk.Button(main_plant_frame, text="添加到主力植物", command=self.add_to_main_plants).pack(fill=tk.X)
        
        # 炮灰植物列表
        cannon_plant_frame = ttk.Frame(plant_lists_frame)
        cannon_plant_frame.pack(side=tk.RIGHT, fill=tk.X, expand=True, padx=2)
        
        ttk.Label(cannon_plant_frame, text="炮灰植物").pack(anchor=tk.W)
        self.cannon_plant_list = tk.Listbox(cannon_plant_frame, height=8, selectmode=tk.SINGLE)
        self.cannon_plant_list.pack(fill=tk.X, pady=2)
        ttk.Button(cannon_plant_frame, text="添加到炮灰植物", command=self.add_to_cannon_plants).pack(fill=tk.X)
        
        # 右边：分页区域
        right_frame = ttk.Frame(h_frame)
        right_frame.pack(side=tk.RIGHT, fill=tk.BOTH, expand=True)
        
        # 分页区域
        self.notebook = ttk.Notebook(right_frame)
        self.notebook.pack(fill=tk.BOTH, expand=True, pady=5)
        
        # 第一页：植物管理（刷品、进化、合成）
        plant_page = ttk.Frame(self.notebook)
        self.notebook.add(plant_page, text="植物管理")
        
        # 刷品区
        brush_frame = ttk.LabelFrame(plant_page, text="植物刷品区")
        brush_frame.pack(fill=tk.X, padx=5, pady=2)
        
        ttk.Label(brush_frame, text="刷品目标:").pack(side=tk.LEFT, padx=5)
        self.brush_target_combo = ttk.Combobox(brush_frame, values=["神器", "魔神", "耀世", "不朽"], state="readonly", width=8)
        self.brush_target_combo.current(1)
        self.brush_target_combo.pack(side=tk.LEFT, padx=5)
        
        self.judge_btn = ttk.Button(brush_frame, text="判断刷品", command=self.toggle_brush)
        self.judge_btn.pack(side=tk.LEFT, padx=5)
        
        self.pack_btn = ttk.Button(brush_frame, text="百次刷品", command=self.toggle_brush_pack)
        self.pack_btn.pack(side=tk.LEFT, padx=5)
        
        sell_btn = ttk.Button(brush_frame, text="出售植物", command=self.start_sell_plants)
        sell_btn.pack(side=tk.LEFT, padx=5)
        
        # 进化区
        upgrade_frame = ttk.LabelFrame(plant_page, text="植物进化区")
        upgrade_frame.pack(fill=tk.X, padx=5, pady=2)
        
        ttk.Label(upgrade_frame, text="选择植物进化目标:").pack(side=tk.LEFT, padx=5)
        self.upgrade_combo = ttk.Combobox(upgrade_frame, values=["飞飞萝卜"], state="readonly", width=8)
        self.upgrade_combo.current(0)
        self.upgrade_combo.pack(side=tk.LEFT, padx=5)
        
        self.upgrade_btn = ttk.Button(upgrade_frame, text="开始进化", command=self.toggle_upgrade)
        self.upgrade_btn.pack(side=tk.LEFT, padx=5)
        
        buy_btn = ttk.Button(upgrade_frame, text="购买小红", command=self.show_buy_red_window)
        buy_btn.pack(side=tk.LEFT, padx=5)
        
        # 合成区
        synthesis_frame = ttk.LabelFrame(plant_page, text="植物合成区")
        synthesis_frame.pack(fill=tk.X, padx=5, pady=2)
        
        self.synthesis_var = tk.StringVar(value="血量")
        attrs = ["血量", "攻击", "护甲", "穿透", "闪避", "命中"]
        for attr in attrs:
            radio = ttk.Radiobutton(synthesis_frame, text=attr, variable=self.synthesis_var, value=attr)
            radio.pack(side=tk.LEFT, padx=10)
        
        self.synth_btn = ttk.Button(synthesis_frame, text="开始合成", command=self.toggle_synthesis)
        self.synth_btn.pack(side=tk.LEFT, padx=10)
        
        # 第一页日志区域
        plant_log_frame = ttk.LabelFrame(plant_page, text="日志")
        plant_log_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.log_text = tk.Text(plant_log_frame, height=20, wrap=tk.WORD)
        self.log_text.config(state=tk.DISABLED)
        
        plant_log_scroll = ttk.Scrollbar(plant_log_frame, orient=tk.VERTICAL, command=self.log_text.yview)
        self.log_text.configure(yscrollcommand=plant_log_scroll.set)
        
        self.log_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        plant_log_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 第二页：植物带级区
        level_page = ttk.Frame(self.notebook)
        self.notebook.add(level_page, text="植物带级")
        
        # 宝石副本带级设置
        gem_frame = ttk.LabelFrame(level_page, text="宝石副本带级设置")
        gem_frame.pack(fill=tk.X, padx=5, pady=2)
        
        self.use_gem_book_var = tk.BooleanVar()
        
        # 宝石副本关卡数据
        self.cavern_levels = [
            ["神秘洞穴1", "1"], ["神秘洞穴2", "2"], ["神秘洞穴3", "3"], ["神秘洞穴4", "4"],
            ["神秘洞穴5", "5"], ["神秘洞穴6", "6"], ["神秘洞穴7", "7"], ["神秘洞穴8", "8"],
            ["神秘洞穴9", "9"], ["神秘洞穴10", "10"], ["神秘洞穴11", "11"], ["神秘洞穴12", "12"],
            ["光明圣城1", "13"], ["光明圣城2", "14"], ["光明圣城3", "15"], ["光明圣城4", "16"],
            ["光明圣城5", "17"], ["光明圣城6", "18"], ["光明圣城7", "19"], ["光明圣城8", "20"],
            ["光明圣城9", "21"], ["光明圣城10", "22"], ["光明圣城11", "23"], ["光明圣城12", "24"],
            ["黑暗之塔1", "25"], ["黑暗之塔2", "26"], ["黑暗之塔3", "27"], ["黑暗之塔4", "28"],
            ["黑暗之塔5", "29"], ["黑暗之塔6", "30"], ["黑暗之塔7", "31"], ["黑暗之塔8", "32"],
            ["黑暗之塔9", "33"], ["黑暗之塔10", "34"], ["黑暗之塔11", "35"], ["黑暗之塔12", "36"],
            ["僵尸坟场1", "37"], ["僵尸坟场2", "38"], ["僵尸坟场3", "39"], ["僵尸坟场4", "40"],
            ["僵尸坟场5", "41"], ["僵尸坟场6", "42"], ["僵尸坟场7", "43"], ["僵尸坟场8", "44"],
            ["僵尸坟场9", "45"], ["僵尸坟场10", "46"], ["僵尸坟场11", "47"], ["僵尸坟场12", "48"],
            ["古老树屋1", "49"], ["古老树屋2", "50"], ["古老树屋3", "51"], ["古老树屋4", "52"],
            ["古老树屋5", "53"], ["古老树屋6", "54"], ["古老树屋7", "55"], ["古老树屋8", "56"],
            ["古老树屋9", "57"], ["古老树屋10", "58"], ["古老树屋11", "59"], ["古老树屋12", "60"],
            ["亡灵沼泽1", "61"], ["亡灵沼泽2", "62"], ["亡灵沼泽3", "63"], ["亡灵沼泽4", "64"],
            ["亡灵沼泽5", "65"], ["亡灵沼泽6", "66"], ["亡灵沼泽7", "67"], ["亡灵沼泽8", "68"],
            ["亡灵沼泽9", "69"], ["亡灵沼泽10", "70"], ["亡灵沼泽11", "71"], ["亡灵沼泽12", "72"],
            ["冰岛1", "73"], ["冰岛2", "74"], ["冰岛3", "75"], ["冰岛4", "76"],
            ["冰岛5", "77"], ["冰岛6", "78"], ["冰岛7", "79"], ["冰岛8", "80"],
            ["冰岛9", "81"], ["冰岛10", "82"], ["冰岛11", "83"], ["冰岛12", "84"],
            ["末日火山1", "85"], ["末日火山2", "86"], ["末日火山3", "87"], ["末日火山4", "88"],
            ["末日火山5", "89"], ["末日火山6", "90"], ["末日火山7", "91"], ["末日火山8", "92"],
            ["末日火山9", "93"], ["末日火山10", "94"], ["末日火山11", "95"], ["末日火山12", "96"],
            ["天空之岛1", "97"], ["天空之岛2", "98"], ["天空之岛3", "99"], ["天空之岛4", "100"],
            ["天空之岛5", "101"], ["天空之岛6", "102"], ["天空之岛7", "103"], ["天空之岛8", "104"],
            ["天空之岛9", "105"], ["天空之岛10", "106"], ["天空之岛11", "107"], ["天空之岛12", "108"]
        ]
        
        # 第一行：选择关卡
        gem_row1 = ttk.Frame(gem_frame)
        gem_row1.pack(fill=tk.X, pady=2)
        ttk.Label(gem_row1, text="选择关卡：").pack(side=tk.LEFT, padx=5)
        self.gem_level_combo = ttk.Combobox(gem_row1, state="readonly", width=15)
        self.gem_level_combo['values'] = [level[0] for level in self.cavern_levels]
        self.gem_level_combo.current(0)
        self.gem_level_combo.pack(side=tk.LEFT, padx=5)
        
        # 第二行：选择难度和使用挑战书
        gem_row2 = ttk.Frame(gem_frame)
        gem_row2.pack(fill=tk.X, pady=2)
        ttk.Label(gem_row2, text="选择难度：").pack(side=tk.LEFT, padx=5)
        self.gem_diff_combo = ttk.Combobox(gem_row2, values=["简单", "普通", "困难"], state="readonly", width=8)
        self.gem_diff_combo.current(0)
        self.gem_diff_combo.pack(side=tk.LEFT, padx=5)
        
        self.use_gem_book_var = tk.BooleanVar()
        ttk.Checkbutton(gem_row2, text="使用宝石挑战书", variable=self.use_gem_book_var).pack(side=tk.LEFT, padx=5)
        
        # 狩猎场洞口带级设置
        chall_frame = ttk.LabelFrame(level_page, text="狩猎场洞口带级设置")
        chall_frame.pack(fill=tk.X, padx=5, pady=2)
        
        self.use_sand_var = tk.BooleanVar()
        
        # 第一行：选择挑战书
        chall_row1 = ttk.Frame(chall_frame)
        chall_row1.pack(fill=tk.X, pady=2)
        ttk.Label(chall_row1, text="选择挑战书：").pack(side=tk.LEFT, padx=5)
        self.chall_book_combo = ttk.Combobox(chall_row1, values=["挑战书", "高级挑战书", "不用挑战书"], state="readonly", width=12)
        self.chall_book_combo.current(0)
        self.chall_book_combo.pack(side=tk.LEFT, padx=5)
        
        # 第二行：选择难度和使用时之沙
        chall_row2 = ttk.Frame(chall_frame)
        chall_row2.pack(fill=tk.X, pady=2)
        ttk.Label(chall_row2, text="选择难度：").pack(side=tk.LEFT, padx=5)
        self.chall_diff_combo = ttk.Combobox(chall_row2, values=["简单", "普通", "困难"], state="readonly", width=8)
        self.chall_diff_combo.current(0)
        self.chall_diff_combo.pack(side=tk.LEFT, padx=5)
        
        self.use_sand_var = tk.BooleanVar()
        ttk.Checkbutton(chall_row2, text="使用时之沙", variable=self.use_sand_var).pack(side=tk.LEFT, padx=5)
        
        # 世界副本带级设置
        world_frame = ttk.LabelFrame(level_page, text="世界副本带级设置")
        world_frame.pack(fill=tk.X, padx=5, pady=2)
        
        # 世界副本关卡映射
        self.world_levels = {"高孤城壁": 108, "古堡宴会厅": 231}
        
        ttk.Label(world_frame, text="选择关卡：").pack(side=tk.LEFT, padx=5)
        self.world_level_combo = ttk.Combobox(world_frame, state="readonly", width=15)
        self.world_level_combo['values'] = list(self.world_levels.keys())
        self.world_level_combo.current(0)
        self.world_level_combo.pack(side=tk.LEFT, padx=5)
        
        self.use_world_book_var = tk.BooleanVar()
        ttk.Checkbutton(world_frame, text="使用副本挑战书", variable=self.use_world_book_var).pack(side=tk.LEFT, padx=5)
        
        # 全局设置
        global_frame = ttk.LabelFrame(level_page, text="全局设置")
        global_frame.pack(fill=tk.X, padx=5, pady=2)
        
        # 第一行：血瓶设置、目标等级、开始带级按钮
        global_row1 = ttk.Frame(global_frame)
        global_row1.pack(fill=tk.X, pady=2)
        
        ttk.Label(global_row1, text="血瓶设置：").pack(side=tk.LEFT, padx=5)
        self.potion_combo = ttk.Combobox(global_row1, values=["低级血瓶", "中级血瓶", "高级血瓶", "不用血瓶"], state="readonly", width=10)
        self.potion_combo.current(0)
        self.potion_combo.pack(side=tk.LEFT, padx=5)
        
        ttk.Label(global_row1, text="目标等级：").pack(side=tk.LEFT, padx=5)
        self.level_edit = ttk.Entry(global_row1, width=10, validate="key")
        self.level_edit.insert(0, "100")
        self.level_edit['validatecommand'] = (self.root.register(self.validate_level_input), '%P')
        self.level_edit.pack(side=tk.LEFT, padx=5)
        
        self.start_level_btn = ttk.Button(global_row1, text="开始带级", command=self.toggle_leveling)
        self.start_level_btn.pack(side=tk.LEFT, padx=10)
        
        # 第二行：带级模式选择和累计掉落道具按钮
        global_row2 = ttk.Frame(global_frame)
        global_row2.pack(fill=tk.X, pady=2)
        
        self.level_mode_var = tk.IntVar(value=0)  # 0=宝石带级, 1=洞口带级, 2=副本带级
        ttk.Radiobutton(global_row2, text="宝石带级", variable=self.level_mode_var, value=0).pack(side=tk.LEFT, padx=5)
        ttk.Radiobutton(global_row2, text="洞口带级", variable=self.level_mode_var, value=1).pack(side=tk.LEFT, padx=5)
        ttk.Radiobutton(global_row2, text="副本带级", variable=self.level_mode_var, value=2).pack(side=tk.LEFT, padx=5)
        
        self.show_items_btn = ttk.Button(global_row2, text="累计掉落道具列表", command=self.show_item_list_dialog)
        self.show_items_btn.pack(side=tk.RIGHT, padx=5)
        
        # 第二页日志区域（带级日志）
        level_log_frame = ttk.LabelFrame(level_page, text="带级日志")
        level_log_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)
        
        self.level_log_text = tk.Text(level_log_frame, height=20, wrap=tk.WORD)
        self.level_log_text.config(state=tk.DISABLED)
        
        level_log_scroll = ttk.Scrollbar(level_log_frame, orient=tk.VERTICAL, command=self.level_log_text.yview)
        self.level_log_text.configure(yscrollcommand=level_log_scroll.set)
        
        self.level_log_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        level_log_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        
        # 加载植物数据
        self.load_plant_data()
    
    def on_right_click(self, event):
        """处理右键点击事件"""
        # 获取点击位置的行
        item = self.table.identify_row(event.y)
        if item:
            # 设置选中状态
            self.table.selection_set(item)
            # 使用event.x_root和event.y_root直接显示菜单
            self.table_menu.post(event.x_root, event.y_root)
    
    def on_table_drag(self, event):
        """处理鼠标拖动框选"""
        # 获取鼠标当前位置的行
        item = self.table.identify_row(event.y)
        if item:
            # 如果当前行不在选中列表中，添加到选中
            current_selection = self.table.selection()
            if item not in current_selection:
                self.table.selection_add(item)
    
    def add_log(self, text):
        """添加日志（线程安全）"""
        self.root.after(0, lambda: self._add_log_impl(text))
    
    def _add_log_impl(self, text):
        """添加日志的实际实现"""
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        self.log_text.config(state=tk.NORMAL)
        self.log_text.insert(tk.END, f"[{current_time}] {text}\n")
        self.log_text.see(tk.END)
        self.log_text.config(state=tk.DISABLED)
    
    def load_plant_data(self):
        """加载植物数据"""
        self.add_log("正在加载植物数据...")
        # 清空表格
        for item in self.table.get_children():
            self.table.delete(item)
        
        try:
            # 获取植物数据
            self.plant_data_list = self.get_mock_plant_data()
            self.populate_table(self.plant_data_list)
            self.add_log(f"植物数据加载完成，共 {len(self.plant_data_list)} 个植物")
            
            # 实时更新主力植物和炮灰植物列表中的等级
            self.refresh_plant_levels()
        except Exception as e:
            self.add_log(f"加载植物数据失败: {e}")
    
    def get_mock_plant_data(self):
        """获取植物数据"""
        try:
            # 调用pvzall模块获取真实的植物仓库数据
            raw_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", self.add_log)
            if not raw_data or not isinstance(raw_data, list):
                return []
            
            plant_list = []
            for plant_data in raw_data:
                if not isinstance(plant_data, list) or len(plant_data) < 27:
                    continue
                plant_id = str(plant_data[0])
                plant_name = pvzall.Plant_name(plant_data[1])
                plant_list.append({
                    "id": plant_id,                                      # 植物ID
                    "name": plant_name,                                  # 植物名字
                    "level": str(plant_data[7]),                         # 植物等级
                    "quality": str(plant_data[15]),                     # 植物品质
                    "hp": pvzall.num_format(plant_data[6]),              # 植物HP
                    "attack": pvzall.num_format(plant_data[2]),          # 植物攻击
                    "defense": pvzall.num_format(plant_data[3]),         # 植物护甲
                    "penetration": pvzall.num_format(plant_data[12]),     # 植物穿透
                    "dodge": pvzall.num_format(plant_data[13]),           # 植物闪避
                    "hit": pvzall.num_format(plant_data[14]),             # 植物命中
                    "power": pvzall.num_format(plant_data[26])            # 植物战力
                })
            return plant_list
        except Exception as e:
            self.add_log(f"获取植物数据失败: {e}")
            return []
    
    def populate_table(self, plant_data):
        """填充表格"""
        for index, plant in enumerate(plant_data, start=1):
            self.table.insert("", tk.END, values=(
                index,
                str(plant.get("id", "")),
                str(plant.get("name", "")),
                str(plant.get("level", "")),
                str(plant.get("quality", "")),
                str(plant.get("hp", "")),
                str(plant.get("attack", "")),
                str(plant.get("defense", "")),
                str(plant.get("penetration", "")),
                str(plant.get("dodge", "")),
                str(plant.get("hit", "")),
                str(plant.get("power", ""))
            ))
    
    def sort_by_column(self, column):
        """点击表头排序"""
        # 列名与数据字段的映射
        column_map = {
            "序号": None,
            "植物ID": "id",
            "植物名字": "name",
            "植物等级": "level",
            "植物品质": "quality",
            "植物HP": "hp",
            "植物攻击": "attack",
            "植物护甲": "defense",
            "植物穿透": "penetration",
            "植物闪避": "dodge",
            "植物命中": "hit",
            "植物战力": "power"
        }
        
        field = column_map.get(column)
        if field is None:
            return
        
        # 判断排序方向
        if self.sort_column == column:
            self.sort_reverse = not self.sort_reverse
        else:
            self.sort_column = column
            self.sort_reverse = False
        
        # 排序数据
        def get_sort_value(plant):
            val = plant.get(field, "")
            # 尝试转换为数字排序
            try:
                # 处理带单位的数字（如1.2万、5000等）
                if isinstance(val, str):
                    val = val.replace("万", "").replace("亿", "")
                    if "." in val:
                        return float(val)
                    return int(val)
                return float(val)
            except:
                return str(val)
        
        sorted_data = sorted(self.plant_data_list, key=get_sort_value, reverse=self.sort_reverse)
        
        # 清空表格并重新填充
        for item in self.table.get_children():
            self.table.delete(item)
        self.populate_table(sorted_data)
        
        # 更新表头显示排序方向
        order_text = " ↓" if self.sort_reverse else " ↑"
        for col in self.table["columns"]:
            if col == column:
                self.table.heading(col, text=col + order_text, command=lambda c=col: self.sort_by_column(c))
            else:
                self.table.heading(col, text=col, command=lambda c=col: self.sort_by_column(c))
    
    def get_selected_plant_ids(self):
        """获取选中的植物ID列表"""
        selected_items = self.table.selection()
        plant_ids = []
        for item in selected_items:
            values = self.table.item(item, "values")
            if len(values) >= 2:
                plant_ids.append(values[1])  # 植物ID在第二列
        return plant_ids
    
    def get_selected_plants_info(self):
        """获取选中的植物完整信息列表 [plant_id, plant_name, plant_level, plant_quality]"""
        selected_items = self.table.selection()
        plants_info = []
        for item in selected_items:
            values = self.table.item(item, "values")
            if len(values) >= 5:
                # [植物ID, 植物名字, 植物等级, 植物品质]
                plants_info.append([values[1], values[2], values[3], values[4]])
        return plants_info
    
    def toggle_brush(self):
        """切换判断刷品状态：开始或停止"""
        if self.brush_running:
            # 停止刷品
            self.stop_brush_event.set()
            self.brush_running = False
            self.judge_btn.config(text="判断刷品")
            self.add_log("=== 已停止判断刷品 ===")
        else:
            # 开始刷品
            selected_ids = self.get_selected_plant_ids()
            if not selected_ids:
                self.add_log("请先在列表中选择植物（可多选）")
                return
            
            target = self.brush_target_combo.get()
            self.add_log(f"判断刷品 - 目标品质: {target}, 选中植物: {len(selected_ids)} 个")
            
            # 重置停止事件
            self.stop_brush_event.clear()
            self.brush_running = True
            self.judge_btn.config(text="停止刷品")
            
            # 在后台线程中执行刷品，避免阻塞GUI
            def run_brush():
                total_count = len(selected_ids)
                for index, plant_id in enumerate(selected_ids, 1):
                    # 检查是否已停止
                    if self.stop_brush_event.is_set():
                        break
                    
                    self.add_log(f"=== 正在处理第 {index}/{total_count} 个植物: {plant_id} ===")
                    self.add_log(f"开始为植物 {plant_id} 刷品，目标品质: {target}")
                    
                    brush_count = 0
                    while not self.stop_brush_event.is_set():
                        brush_count += 1
                        self.add_log(f"植物 {plant_id} 第 {brush_count} 次刷品...")
                        
                        result = pvzall.user_qualityUp(self.daqu, self.ck, plant_id)
                        if result[0] == "success":
                            current_quality = str(result[1])
                            self.add_log(f"{plant_id} 刷品成功，当前品质: {current_quality}")
                            current_quality_value = quality_map.get(current_quality, 0)
                            target_value = quality_map.get(target, 0)
                            if current_quality_value >= target_value:
                                self.add_log(f"{plant_id} 当前品质 {current_quality} 已达到或超过目标品质 {target}，开始下一个植物")
                                break
                            else:
                                self.add_log(f"{plant_id} 当前品质 {current_quality} 未达到目标品质 {target}，继续刷品")
                        else:
                            self.add_log(f"{plant_id} 刷品失败")
                    
                    # 给GUI一点时间更新
                    time.sleep(0.1)
                
                # 重置状态
                self.brush_running = False
                self.root.after(0, lambda: self.judge_btn.config(text="判断刷品"))
                
                if self.stop_brush_event.is_set():
                    self.add_log("=== 判断刷品已被手动停止 ===")
                else:
                    self.add_log("=== 所有植物刷品完成 ===")
                
                # 刷新植物列表，使用after确保在主线程中执行
                self.root.after(0, self.load_plant_data)
            
            # 启动后台线程
            threading.Thread(target=run_brush, daemon=True).start()
    
    def toggle_brush_pack(self):
        """切换百次刷品状态：开始或停止"""
        if self.brush_pack_running:
            # 停止刷品
            self.stop_brush_pack_event.set()
            self.brush_pack_running = False
            self.pack_btn.config(text="百次刷品")
            self.add_log("=== 已停止百次刷品 ===")
        else:
            # 开始刷品
            plants_info = self.get_selected_plants_info()
            if not plants_info:
                self.add_log("请先在列表中选择植物（可多选）")
                return
            
            target = self.brush_target_combo.get()
            target_value = quality_map.get(target, 0)
            self.add_log(f"百次刷品 - 目标品质: {target}({target_value}), 选中植物: {len(plants_info)} 个")
            
            # 重置停止事件
            self.stop_brush_pack_event.clear()
            self.brush_pack_running = True
            self.pack_btn.config(text="停止刷品")
            
            # 在后台线程中执行百次刷品，避免阻塞GUI
            def run_brush_pack():
                # 构建待刷品植物队列，每个元素包含：[plant_id, plant_name, current_quality_value, need_brush_count]
                brush_queue = []
                for plant_info in plants_info:
                    plant_id, plant_name, plant_level, current_quality = plant_info
                    current_quality_value = quality_map.get(current_quality, 0)
                    need_count = max(0, target_value - current_quality_value)
                    
                    if current_quality_value >= target_value:
                        self.add_log(f"{plant_name}({plant_id}) 当前品质 {current_quality} 已达到目标品质 {target}，跳过")
                    elif need_count < 5:
                        self.add_log(f"{plant_name}({plant_id}) 需要刷品 {need_count} 次（不足5次），跳过")
                    else:
                        brush_queue.append([plant_id, plant_name, current_quality_value, need_count])
                
                if not brush_queue:
                    self.add_log("没有需要刷品的植物")
                    # 重置状态
                    self.brush_pack_running = False
                    self.root.after(0, lambda: self.pack_btn.config(text="百次刷品"))
                    return
                
                self.add_log(f"待刷品植物列表: {[(p[1], p[3]) for p in brush_queue]}")
                
                pack_count = 0
                while brush_queue and not self.stop_brush_pack_event.is_set():
                    pack_count += 1
                    
                    # 构建一批100次刷品请求，从队列中获取植物
                    plant_ids = []
                    current_batch_plants = []  # 记录本次批次包含哪些植物及各自的刷品次数
                    
                    remaining = 100
                    i = 0
                    while i < len(brush_queue) and remaining > 0:
                        plant_id, plant_name, current_quality_value, need_count = brush_queue[i]
                        
                        # 计算这个植物本次可以刷的次数
                        take_count = min(need_count, remaining)
                        
                        if take_count > 0:
                            # 添加刷品请求
                            for _ in range(take_count):
                                plant_ids.append([plant_id, "api.apiorganism.qualityUp"])
                            
                            current_batch_plants.append({
                                'plant_id': plant_id,
                                'plant_name': plant_name,
                                'current_quality_value': current_quality_value,
                                'take_count': take_count,
                                'original_need_count': need_count
                            })
                            
                            remaining -= take_count
                            # 更新队列中的剩余需求
                            brush_queue[i][3] -= take_count
                        
                        i += 1
                    
                    # 执行刷品
                    self.add_log(f"第 {pack_count} 次刷品批次，共 {len(plant_ids)} 次，包含 {len(current_batch_plants)} 个植物")
                    for p in current_batch_plants:
                        self.add_log(f"  - {p['plant_name']}({p['plant_id']}): 本次刷{p['take_count']}次")
                    
                    # 获取刷品结果，返回字典 {plant_id: quality}
                    result = pvzall.up_quality_pack(self.daqu, self.ck, plant_ids, "1")
                    
                    # 检查是否已停止
                    if self.stop_brush_pack_event.is_set():
                        break
                    
                    # 统计本次批次的最高品质
                    max_quality_name = None
                    max_quality_value = 0
                    if isinstance(result, dict):
                        for plant_id, quality in result.items():
                            q_value = quality_map.get(quality, 0)
                            if q_value > max_quality_value:
                                max_quality_value = q_value
                                max_quality_name = quality
                    
                    self.add_log(f"第 {pack_count} 次刷品完成，最高品质: {max_quality_name if max_quality_name else '未找到'}")
                    
                    # 使用刷品响应更新队列状态（无需重新请求仓库数据）
                    updated_queue = []
                    for plant in brush_queue:
                        plant_id, plant_name, current_quality_value, need_count = plant
                        
                        # 从响应中获取该植物的品质
                        current_quality = result.get(str(plant_id), "")
                        if not current_quality:
                            # 如果响应中没有找到，保持原品质
                            current_quality_value = plant[2]
                        else:
                            current_quality_value = quality_map.get(current_quality, current_quality_value)
                        
                        new_need_count = max(0, target_value - current_quality_value)
                        
                        if current_quality_value >= target_value:
                            self.add_log(f"{plant_name}({plant_id}) 当前品质 {current_quality} 已达到目标品质 {target}，完成")
                        else:
                            self.add_log(f"{plant_name}({plant_id}) 当前品质 {current_quality}，还需刷品 {new_need_count} 次")
                            updated_queue.append([plant_id, plant_name, current_quality_value, new_need_count])
                    
                    brush_queue = updated_queue
                    
                    # 给GUI一点时间更新
                    time.sleep(0.1)
                
                # 重置状态
                self.brush_pack_running = False
                self.root.after(0, lambda: self.pack_btn.config(text="百次刷品"))
                
                if self.stop_brush_pack_event.is_set():
                    self.add_log("=== 百次刷品已被手动停止 ===")
                else:
                    self.add_log("=== 所有植物百次刷品完成 ===")
                
                # 刷新植物列表
                self.root.after(0, self.load_plant_data)
            
            # 启动后台线程
            threading.Thread(target=run_brush_pack, daemon=True).start()



    
    def toggle_upgrade(self):
        """切换进化状态：开始或停止"""
        if self.upgrade_running:
            # 停止进化
            self.stop_upgrade_event.set()
            self.upgrade_running = False
            self.upgrade_btn.config(text="开始进化")
            self.add_log("=== 已停止进化 ===")
        else:
            # 开始进化
            plants_info = self.get_selected_plants_info()
            if not plants_info:
                self.add_log("请先在列表中选择植物（可多选）")
                return
            
            target_plant = self.upgrade_combo.get()
            self.add_log(f"开始进化植物: {target_plant}, 选中植物: {len(plants_info)} 个")
            
            # 重置停止事件
            self.stop_upgrade_event.clear()
            self.upgrade_running = True
            self.upgrade_btn.config(text="停止进化")
            
            # 在线程中执行进化
            def run_evolution():
                try:
                    # 设置进化路径
                    evolution_path = []
                    if target_plant == "飞飞萝卜":
                        evolution_path = [
                            [73, '草莓小红', '咒符小红', '30', '蓝叶草'],
                            [74, '咒符小红', '飞飞萝卜', '31', '双叶草']
                        ]
                    
                    if not evolution_path:
                        self.add_log(f"暂未配置 {target_plant} 的进化路径")
                        # 重置状态
                        self.upgrade_running = False
                        self.root.after(0, lambda: self.upgrade_btn.config(text="开始进化"))
                        return
                    
                    success_count = 0
                    fail_count = 0
                    
                    for plant_info in plants_info:
                        # 检查是否已停止
                        if self.stop_upgrade_event.is_set():
                            break
                        
                        # plant_info: [plant_id, plant_name, plant_level, plant_quality]
                        plant_id, plant_name, plant_level, plant_quality = plant_info
                        
                        # 检查植物是否在进化路径中
                        if not any(plant_name == item[1] for item in evolution_path):
                            self.add_log(f"{plant_name}({plant_id}) 不在进化路径中，跳过")
                            continue
                        
                        # 循环进化直到达到目标植物
                        while not self.stop_upgrade_event.is_set():
                            found = False
                            for path_item in evolution_path:
                                if str(plant_name) == str(path_item[1]):
                                    found = True
                                    result = pvzall.plant_evolve(self.daqu, self.ck, plant_id, path_item[3])
                                    
                                    if path_item[2] in str(result):
                                        self.add_log(f"{plant_name}({plant_id}) 进化成功！现在是 {path_item[2]}")
                                        plant_name = path_item[2]
                                        success_count += 1
                                    elif '生物等级不足' in str(result):
                                        self.add_log(f"{plant_name}({plant_id}) 植物等级不足")
                                        fail_count += 1
                                        break
                                    elif 'HP小于1' in str(result):
                                        self.add_log(f"{plant_name}({plant_id}) HP小于1，无法进化")
                                        fail_count += 1
                                        break
                                    else:
                                        self.add_log(f"{plant_name}({plant_id}) 进化失败: {result}")
                                        fail_count += 1
                                        break
                                    break
                            
                            if not found or plant_name == target_plant:
                                break
                    
                    # 重置状态
                    self.upgrade_running = False
                    self.root.after(0, lambda: self.upgrade_btn.config(text="开始进化"))
                    
                    if self.stop_upgrade_event.is_set():
                        self.add_log(f"进化已被手动停止 - 当前成功: {success_count}, 失败: {fail_count}")
                    else:
                        self.add_log(f"进化完成 - 成功: {success_count}, 失败: {fail_count}")
                    
                    self.root.after(0, self.load_plant_data)
                    
                except Exception as e:
                    self.add_log(f"进化失败: {e}")
                    # 重置状态
                    self.upgrade_running = False
                    self.root.after(0, lambda: self.upgrade_btn.config(text="开始进化"))
            
            # 启动线程
            thread = threading.Thread(target=run_evolution, daemon=True)
            thread.start()
    
    def toggle_synthesis(self):
        """切换合成状态：开始/停止合成"""
        if self.synthesis_running:
            # 停止合成
            self.synthesis_running = False
            self.stop_synthesis_event.set()
            self.synth_btn.config(text="开始合成")
            self.add_log("========== 正在停止合成 ==========")
        else:
            # 开始合成
            self.synthesis_running = True
            self.stop_synthesis_event.clear()
            self.synth_btn.config(text="停止合成")
            self.start_synthesis()
    
    def start_synthesis(self):
        """开始合成"""
        selected_ids = self.get_selected_plant_ids()
        if not selected_ids:
            self.add_log("请先在列表中选择植物（可多选）")
            self.synthesis_running = False
            self.synth_btn.config(text="开始合成")
            return
        
        if len(selected_ids) < 2:
            self.add_log("至少需要选择2个植物才能进行合成")
            self.synthesis_running = False
            self.synth_btn.config(text="开始合成")
            return
        
        synthesis_plant = self.synthesis_var.get()
        self.add_log(f"开始合成，目标属性: {synthesis_plant}")
        self.add_log(f"共选择 {len(selected_ids)} 个植物进行合成")
        
        # 在后台线程中执行合成操作
        def run_synthesis():
            try:
                self.add_log("正在获取植物仓库数据...")
                plant_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", None)
                # plant_data[2] = 攻击， plant_data[6] = 血量， plant_data[3] = 护甲，
                # plant_data[12] = 穿透， plant_data[13] = 闪避， plant_data[14] = 命中
                # plant_data[0] = 植物 id

                # 只保留选中ID的植物数据
                new_plant_data = [p for p in plant_data if p[0] in selected_ids]
                self.add_log(f"已筛选 {len(new_plant_data)} 个选中植物")
                
                if len(new_plant_data) < 2:
                    self.add_log("选中植物不足2个，合成结束")
                    self.synthesis_running = False
                    self.synth_btn.config(text="开始合成")
                    return
                
                # 找到初始的最大植物
                get_max_min_plant_number = pvzall.select_plant_chinese(synthesis_plant, new_plant_data)
                if not get_max_min_plant_number or len(get_max_min_plant_number) < 3:
                    self.add_log("未能找到符合条件的植物进行合成")
                    self.synthesis_running = False
                    self.synth_btn.config(text="开始合成")
                    return
                
                current_max_plant = get_max_min_plant_number[0]  # 当前最大植物
                book = get_max_min_plant_number[2]  # 合成书籍
                
                # 从剩余植物中移除当前最大植物
                remaining_plants = [p for p in new_plant_data if p[0] != current_max_plant[0]]
                round_count = 0
                
                while len(remaining_plants) > 0 and self.synthesis_running:
                    # 检查是否需要停止
                    if self.stop_synthesis_event.is_set():
                        self.add_log("合成已停止")
                        self.add_log(f"=== 合成中断 ===")
                        self.synthesis_running = False
                        self.synth_btn.config(text="开始合成")
                        return
                    
                    round_count += 1
                    self.add_log(f"=== 第 {round_count} 轮合成 ===")
                    self.add_log(f"当前最大植物ID: {current_max_plant[0]}，剩余 {len(remaining_plants)} 个植物")
                    
                    # 从剩余植物中找到比当前最大植物属性低的植物
                    get_max_min = pvzall.select_plant_chinese(synthesis_plant, remaining_plants)
                    if not get_max_min or len(get_max_min) < 2:
                        self.add_log("未能找到符合条件的植物进行合成")
                        break
                    
                    # 剩余植物中最大的（比current_max小的）
                    next_max_plant = get_max_min[0]
                    
                    self.add_log(f"准备合成 - 植物 {next_max_plant[0]} 吃 植物 {current_max_plant[0]} (当前最大)，使用书籍: {book}")

                    # 植物合成，小的吃大的
                    self.add_log("正在执行植物合成...")
                    reasy = pvzall.Plants_eat_plants(self.daqu, self.ck, next_max_plant[0], current_max_plant[0], book)
                    print(f"合成结果: {reasy}")

                    if '不能操作别人的生物' in str(reasy):
                        self.add_log(f"状态出错了,错误状态为:{reasy}")
                        break
                    elif 'fight' in str(reasy):
                        match = re.search(r'<Response status=/onResult>(.*?)</Response>', reasy, re.DOTALL)
                        if match:
                            # 提取出Response标签内的字符串
                            response_str = match.group(1)

                            # 将字符串安全地转换为字典
                            response_dict = ast.literal_eval(response_str)

                            # 提取出战力值
                            fight = response_dict['fight']
                            fight = pvzall.num_format(fight)

                            # 分析植物属性
                            plant_synthesis_data = pvzall.analyse_plant_synthesis(book)
                            plant_synthesis = response_dict[plant_synthesis_data[0]]
                            
                            if int(plant_synthesis) > 700000000000000000000:
                                self.add_log("属性已滚满，合成结束")
                                self.synthesis_running = False
                                self.synth_btn.config(text="开始合成")
                                return
                            
                            plant_synthesis = pvzall.num_format(plant_synthesis)
                            self.add_log(f"植物 {next_max_plant[0]} 获得了{plant_synthesis}点{plant_synthesis_data[1]}，战力为:{fight}")
                    
                    # 更新当前最大植物为刚才吃掉它的植物
                    current_max_plant = next_max_plant
                    # 从剩余列表中移除刚才的植物（现在它变成了最大植物）
                    remaining_plants = [p for p in remaining_plants if p[0] != next_max_plant[0]]
                    self.add_log(f"植物 {next_max_plant[0]} 现在成为最大植物，剩余 {len(remaining_plants)} 个植物")
                
                self.add_log(f"=== 合成完成 ===")
                self.add_log(f"共进行了 {round_count} 轮合成，最终植物ID: {current_max_plant[0]}")
                self.synthesis_running = False
                self.synth_btn.config(text="开始合成")
                
                # 刷新植物列表
                self.root.after(0, self.load_plant_data)
                
            except Exception as e:
                self.add_log(f"合成失败: {e}")
                self.synthesis_running = False
                self.synth_btn.config(text="开始合成")
        
        # 启动后台线程
        thread = threading.Thread(target=run_synthesis, daemon=True)
        thread.start()

    
    def show_buy_red_window(self):
        """显示购买小红窗口"""
        buy_window = tk.Toplevel(self.root)
        buy_window.title("购买小红")
        buy_window.geometry("300x120")
        
        # 居中显示窗口
        buy_window.transient(self.root)
        buy_window.grab_set()
        
        # 购买数量标签
        ttk.Label(buy_window, text="购买数量:").pack(side=tk.LEFT, padx=10, pady=10)
        
        # 购买数量编辑框
        quantity_var = tk.StringVar(value="1")
        quantity_entry = ttk.Entry(buy_window, textvariable=quantity_var, width=10)
        quantity_entry.pack(side=tk.LEFT, padx=5, pady=10)
        
        # 验证函数：只能输入数字，最大192
        def validate_quantity(event=None):
            try:
                value = quantity_var.get()
                if value == "":
                    return True
                num = int(value)
                if num > 192:
                    quantity_var.set("192")
                return True
            except ValueError:
                # 如果输入的不是数字，清空输入
                quantity_var.set("")
                return True
        
        # 绑定输入验证
        quantity_entry.bind("<KeyRelease>", validate_quantity)
        
        # 购买按钮
        def on_buy():
            try:
                quantity = int(quantity_var.get())
                if quantity <= 0:
                    messagebox.showwarning("警告", "购买数量必须大于0")
                    return
                
                self.add_log(f"开始购买小红，数量: {quantity}")
                
                # 调用购买接口
                result = pvzall.AMF_POST([float(705), float(quantity)], 'api.shop.buy', 0, self.ck, self.daqu)
                self.add_log(f"购买小红结果: {result}")
                
                buy_window.destroy()
                
                # 刷新植物列表
                self.root.after(0, self.load_plant_data)
                
            except ValueError:
                messagebox.showwarning("警告", "请输入有效的数字")
            except Exception as e:
                self.add_log(f"购买小红失败: {e}")
                messagebox.showerror("错误", f"购买失败: {e}")
        
        buy_button = ttk.Button(buy_window, text="购买", command=on_buy)
        buy_button.pack(side=tk.LEFT, padx=10, pady=10)
    
    def start_sell_plants(self):
        """出售选中的植物"""
        selected_ids = self.get_selected_plant_ids()
        if not selected_ids:
            self.add_log("请先在列表中选择植物（可多选）")
            return
        
        self.add_log(f"开始出售植物，共 {len(selected_ids)} 个")
        
        # 在后台线程中执行出售，避免阻塞GUI
        def run_sell():
            success_count = 0
            fail_count = 0
            
            for index, plant_id in enumerate(selected_ids, 1):
                self.add_log(f"正在出售第 {index}/{len(selected_ids)} 个植物: {plant_id}")
                
                try:
                    result = pvzall.user_sell_plant(self.daqu, self.ck, plant_id, 1, self.log_text)
                    if result:
                        self.add_log(f"植物 {plant_id} 出售成功")
                        success_count += 1
                    else:
                        self.add_log(f"植物 {plant_id} 出售失败")
                        fail_count += 1
                except Exception as e:
                    self.add_log(f"植物 {plant_id} 出售异常: {e}")
                    fail_count += 1
                
                # 给GUI一点时间更新
                time.sleep(0.1)
            
            self.add_log(f"出售完成 - 成功: {success_count}, 失败: {fail_count}")
            # 刷新植物列表，使用after确保在主线程中执行
            self.root.after(0, self.load_plant_data)
        
        # 启动后台线程
        threading.Thread(target=run_sell, daemon=True).start()
    
    def add_to_main_plants(self):
        """将选中的植物添加到主力植物列表"""
        selected_items = self.table.selection()
        if not selected_items:
            messagebox.showwarning("警告", "请先在植物列表中选择植物")
            return
        
        for item in selected_items:
            plant_id = self.table.item(item, "values")[1]  # 获取植物ID
            plant_name = self.table.item(item, "values")[2]  # 获取植物名字
            plant_level = self.table.item(item, "values")[3]  # 获取植物等级
            plant_info = f"{plant_id} - {plant_name} - 等级{plant_level}"
            
            # 检查是否已存在（只比较ID和名字部分）
            exists = False
            for existing in self.main_plant_list.get(0, tk.END):
                if existing.startswith(f"{plant_id} - {plant_name}"):
                    exists = True
                    break
            
            if not exists:
                self.main_plant_list.insert(tk.END, plant_info)
    
    def add_to_cannon_plants(self):
        """将选中的植物添加到炮灰植物列表"""
        selected_items = self.table.selection()
        if not selected_items:
            messagebox.showwarning("警告", "请先在植物列表中选择植物")
            return
        
        for item in selected_items:
            plant_id = self.table.item(item, "values")[1]  # 获取植物ID
            plant_name = self.table.item(item, "values")[2]  # 获取植物名字
            plant_level = self.table.item(item, "values")[3]  # 获取植物等级
            plant_info = f"{plant_id} - {plant_name} - 等级{plant_level}"
            
            # 检查是否已存在（只比较ID和名字部分）
            exists = False
            for existing in self.cannon_plant_list.get(0, tk.END):
                if existing.startswith(f"{plant_id} - {plant_name}"):
                    exists = True
                    break
            
            if not exists:
                self.cannon_plant_list.insert(tk.END, plant_info)
    
    def refresh_plant_levels(self):
        """实时更新主力植物和炮灰植物列表中的等级"""
        # 更新主力植物列表
        main_plants = self.main_plant_list.get(0, tk.END)
        self.main_plant_list.delete(0, tk.END)
        
        for plant_info in main_plants:
            # 提取植物ID和名字（去掉等级部分）
            parts = plant_info.split(" - ")
            if len(parts) >= 2:
                plant_id = parts[0]
                plant_name = parts[1]
                # 从表格中查找最新等级
                for item in self.table.get_children():
                    values = self.table.item(item, "values")
                    if values[1] == plant_id and values[2] == plant_name:
                        plant_level = values[3]
                        new_info = f"{plant_id} - {plant_name} - 等级{plant_level}"
                        self.main_plant_list.insert(tk.END, new_info)
                        break
        
        # 更新炮灰植物列表
        cannon_plants = self.cannon_plant_list.get(0, tk.END)
        self.cannon_plant_list.delete(0, tk.END)
        
        for plant_info in cannon_plants:
            # 提取植物ID和名字（去掉等级部分）
            parts = plant_info.split(" - ")
            if len(parts) >= 2:
                plant_id = parts[0]
                plant_name = parts[1]
                # 从表格中查找最新等级
                for item in self.table.get_children():
                    values = self.table.item(item, "values")
                    if values[1] == plant_id and values[2] == plant_name:
                        plant_level = values[3]
                        new_info = f"{plant_id} - {plant_name} - 等级{plant_level}"
                        self.cannon_plant_list.insert(tk.END, new_info)
                        break
    
    def add_level_log(self, text):
        """添加带级日志（使用第二页独享日志）"""
        current_time = datetime.datetime.now().strftime("%H:%M:%S")
        self.level_log_text.config(state=tk.NORMAL)
        self.level_log_text.insert(tk.END, f"[{current_time}] {text}\n")
        self.level_log_text.see(tk.END)
        # 限制日志行数
        lines = self.level_log_text.get("1.0", tk.END).count("\n")
        if lines > 200:
            self.level_log_text.delete("1.0", "2.0")
        self.level_log_text.config(state=tk.DISABLED)
    
    def parse_dropped_items(self, reward_data):
        """解析掉落物并统计到全局字典"""
        global total_dropped_items
        # reward_data 可能是列表格式 [{'id': '123', 'amount': 2}, ...]
        # 也可能是字符串格式 "获得 2个道具名称"
        
        if isinstance(reward_data, list):
            # 直接解析列表格式
            for item in reward_data:
                if isinstance(item, dict):
                    tool_id = int(item.get('id', 0))
                    amount = int(item.get('amount', 0))
                    if tool_id and amount:
                        if tool_id in total_dropped_items:
                            total_dropped_items[tool_id] += amount
                        else:
                            total_dropped_items[tool_id] = amount
        elif isinstance(reward_data, str):
            # 从字符串中提取道具信息，格式如：获得 1 个道具 ID:123
            matches = re.findall(r'获得 (\d+) 个.*?道具 ID:(\d+)', reward_data)
            for amount, tool_id in matches:
                tool_id = int(tool_id)
                amount = int(amount)
                if tool_id in total_dropped_items:
                    total_dropped_items[tool_id] += amount
                else:
                    total_dropped_items[tool_id] = amount
    
    def validate_level_input(self, new_value):
        """验证目标等级输入，只能输入数字且不超过460"""
        if new_value == "":
            return True
        if not new_value.isdigit():
            return False
        if int(new_value) > 460:
            self.level_edit.delete(0, tk.END)
            self.level_edit.insert(0, "460")
            return False
        return True
    
    def toggle_leveling(self):
        """切换带级状态：开始/停止带级"""
        if self.leveling_running:
            # 停止带级
            self.leveling_running = False
            self.stop_leveling_event.set()
            self.start_level_btn.config(text="开始带级")
            self.add_level_log("========== 正在停止带级 ==========")
        else:
            # 开始带级
            self.leveling_running = True
            self.stop_leveling_event.clear()
            self.start_level_btn.config(text="停止带级")
            self.start_bring_level()
    
    def start_bring_level(self):
        """开始带级"""
        # 获取设置
        level_mode = self.level_mode_var.get()  # 0=宝石带级, 1=洞口带级, 2=副本带级
        gem_enabled = (level_mode == 0)
        gem_level_name = self.gem_level_combo.get()
        # 根据中文名称查找对应的数字ID
        gem_level = "1"
        for level in self.cavern_levels:
            if level[0] == gem_level_name:
                gem_level = level[1]
                break
        gem_diff = self.gem_diff_combo.get()
        gem_book = self.use_gem_book_var.get()
        
        chall_enabled = (level_mode == 1)
        chall_book = self.chall_book_combo.get()
        chall_diff = self.chall_diff_combo.get()
        use_sand = self.use_sand_var.get()
        
        world_enabled = (level_mode == 2)
        world_level = self.world_level_combo.get()
        world_book = self.use_world_book_var.get()
        
        potion = self.potion_combo.get()
        
        try:
            target_level = int(self.level_edit.get())
            if target_level < 1:
                self.add_level_log("目标等级必须大于0")
                self.leveling_running = False
                self.start_level_btn.config(text="开始带级")
                return
        except ValueError:
            self.add_level_log("请输入有效的目标等级")
            self.leveling_running = False
            self.start_level_btn.config(text="开始带级")
            return
        
        self.add_level_log("========== 开始植物带级 ==========")
        self.add_level_log(f"宝石副本带级: {'开启' if gem_enabled else '关闭'}")
        if gem_enabled:
            self.add_level_log(f"  - 关卡: {gem_level_name}, 难度: {gem_diff}, 使用挑战书: {'是' if gem_book else '否'}")
        
        self.add_level_log(f"狩猎场洞口带级: {'开启' if chall_enabled else '关闭'}")
        if chall_enabled:
            self.add_level_log(f"  - 挑战书: {chall_book}, 难度: {chall_diff}, 使用时之沙: {'是' if use_sand else '否'}")
        
        self.add_level_log(f"世界副本带级: {'开启' if world_enabled else '关闭'}")
        if world_enabled:
            self.add_level_log(f"  - 关卡: {world_level}, 使用挑战书: {'是' if world_book else '否'}")
        
        self.add_level_log(f"血瓶设置: {potion}")
        self.add_level_log(f"目标等级: {target_level}")
        
        # 获取主力植物和炮灰植物
        main_plants = self.main_plant_list.get(0, tk.END)
        cannon_plants = self.cannon_plant_list.get(0, tk.END)
        
        self.add_level_log(f"主力植物数量: {len(main_plants)}")
        self.add_level_log(f"炮灰植物数量: {len(cannon_plants)}")
        
        # 在后台线程中执行带级
        def run_leveling():
            # 血瓶等级映射
            potion_level_map = {
                "低级血瓶": 13,
                "中级血瓶": 14,
                "高级血瓶": 15,
                "不用血瓶": 0
            }
            potion_level = potion_level_map.get(potion, 0)
            
            # 构建主力植物列表 [plant_id, plant_name]
            main_plant_list = []
            for plant in main_plants:
                plant_id = plant.split(" - ")[0]
                plant_name = plant.split(" - ")[1]
                main_plant_list.append([plant_id, plant_name])
            
            # 构建被带植物列表（使用炮灰植物作为被带级植物）
            be_level_plant_list = []
            for plant in cannon_plants:
                plant_id = plant.split(" - ")[0]
                plant_name = plant.split(" - ")[1]
                be_level_plant_list.append([plant_id, plant_name])
            
            # 判断是否开启宝石副本带级
            if gem_enabled:
                while self.leveling_running:
                    # 检查是否需要停止
                    if self.stop_leveling_event.is_set():
                        self.add_level_log("带级已停止")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
                    
                    # 取出植物现在数据
                    self.add_level_log("正在获取植物仓库数据...")
                    plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", None)
                    
                    if not plant_up_data or "跳过" in str(plant_up_data):
                        self.add_level_log("查询植物时丢包，跳过")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
                    
                    # 查看是否需要使用血瓶（植物没血了才用）
                    if potion_level != 0:
                        for main_plant_i in main_plant_list:
                            for plant_i in plant_up_data:
                                if int(plant_i[0]) == int(main_plant_i[0]):
                                    if str(plant_i[5]) == "0":
                                        # 使用血瓶
                                        return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                        self.add_level_log(f"{pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                        
                        for be_level_plant_i in be_level_plant_list:
                            for plant_i in plant_up_data:
                                if int(plant_i[0]) == int(be_level_plant_i[0]):
                                    if str(plant_i[5]) == "0":
                                        # 使用血瓶
                                        return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                        self.add_level_log(f"{pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                    
                    # 重新获取植物数据
                    plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", None)
                    
                    # 取出血量不为零的植物
                    plant_up_data = [sublist for sublist in plant_up_data if int(sublist[5]) != 0]
                    
                    # 取出不在光合作用的植物
                    plant_up_data = [sublist for sublist in plant_up_data if int(sublist[16]) == 0]
                    
                    # 排列子列表等级
                    plant_up_data = sorted(plant_up_data, key=lambda x: int(x[7]))
                    
                    # 取出被带植物最低的等级
                    be_level_plant_ids = {int(n[0]) for n in be_level_plant_list}
                    filtered_plant_up_data = [i for i in plant_up_data if int(i[0]) in be_level_plant_ids]
                    
                    try:
                        # 取出被带植物最低的等级
                        min_sublist = min(filtered_plant_up_data, key=lambda x: int(x[7]))
                        current_min_level = int(min_sublist[7])
                    except ValueError:
                        self.add_level_log("序列为空，无法求最小值")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
                    
                    # 检查是否所有炮灰植物都达到目标等级
                    all_reached = True
                    for i in filtered_plant_up_data:
                        if int(i[7]) < target_level:
                            all_reached = False
                            break
                    
                    if all_reached:
                        self.add_level_log(f"所有炮灰植物已达到目标等级{target_level}")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
                    
                    self.add_level_log(f"当前最低等级为:{current_min_level},目标等级为:{target_level}")
                    
                    # 计算主力植物占用格子数
                    plant_Lattice_number = 0
                    for i in main_plant_list:
                        plant_Lattice_number += int(pvzall.Plant_width_by_name(i[1]))
                    
                    # 构建战斗列表
                    fight_list = []
                    for i in main_plant_list:
                        fight_list.append(i[0])
                    
                    self.add_level_log(f"主力植物占用格子数: {plant_Lattice_number}")
                    
                    # 取出符合条件的被带植物加入战斗列表
                    for i in plant_up_data:
                        if int(i[0]) in [int(n[0]) for n in be_level_plant_list]:
                            # 检查被带植物等级
                            if int(i[7]) >= target_level:
                                self.add_level_log(f"跳过被带植物: {pvzall.Plant_name(int(i[1]))}({int(i[0])}) 等级{int(i[7])} >= 目标等级{target_level}")
                                continue
                            plant_Lattice_number += int(pvzall.Plant_width(int(i[1])))
                            if plant_Lattice_number <= 10:
                                fight_list.append(i[0])
                                self.add_level_log(f"被带植物加入战斗队列: {pvzall.Plant_name(int(i[1]))}({int(i[0])}) 等级{int(i[7])}")
                            else:
                                self.add_level_log(f"战斗队列格子已满，停止添加被带植物")
                                break
                    
                    self.add_level_log(f"战斗列表: {fight_list}")
                    
                    # 查看宝石副本次数
                    cha_count = pvzall.querylook_ChapInfo(self.daqu, self.ck)
                    self.add_level_log(f"宝石副本次数: {cha_count}")
                    
                    if int(cha_count) > 0:
                        # 攻击宝石副本洞口
                        self.add_level_log(f"正在进攻宝石副本 {gem_level_name}...")
                        return_stone_challenge = pvzall.user_stone_challenge(self.daqu, self.ck, fight_list, gem_level)
                        
                        if isinstance(return_stone_challenge, list) and len(return_stone_challenge) > 0:
                            self.add_level_log(f"进攻宝石副本成功！获得道具:")
                            for item in return_stone_challenge:
                                tool_id = item['id']
                                amount = item['amount']
                                total_dropped_items[tool_id] = total_dropped_items.get(tool_id, 0) + amount
                                try:
                                    tool_name = pvzall.Tool_name(tool_id)
                                except:
                                    tool_name = f"道具ID:{tool_id}"
                                self.add_level_log(f"  - {tool_name} x {amount}")
                        elif "True" in str(return_stone_challenge):
                            self.add_level_log(f"进攻宝石副本成功！ {return_stone_challenge}")
                        else:
                            self.add_level_log(f"进攻结果: {return_stone_challenge}")
                    else:
                        self.add_level_log("没有宝石副本次数，无法进攻宝石副本")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
            elif chall_enabled:
                # 洞口带级逻辑
                # 获取用户数据
                self.add_level_log("正在获取用户数据...")
                user_data = pvzall.user_default(self.daqu, self.ck, "")
                if not user_data or "跳过" in str(user_data):
                    self.add_level_log("获取用户数据失败")
                    self.add_level_log("========== 带级结束 ==========")
                    self.leveling_running = False
                    self.start_level_btn.config(text="开始带级")
                    self.root.after(0, self.load_plant_data)
                    return
                
                name = user_data[0]
                user_garden_id_list = user_data[16]
                # print(f"好友花园列表: {user_garden_id_list}")
                
                self.add_level_log(f"当前玩家: {name}")
                
                # 挑战书等级映射
                chall_book_level_map = {
                    "挑战书": 6,
                    "高级挑战书": 7,
                    "不用挑战书": 0
                }
                challenge_book_level = chall_book_level_map.get(chall_book, 0)
                
                # 固定三怪的洞口
                Fixed_three_monsters_public = ["幽灵古堡", "爱情坟墓", "婚姻殿堂",
                                               "猪笼城寨", "食人部落", "体育馆",
                                               "火焰熔炉", "愤怒家族", "火拳艾斯",
                                               "愤怒骑士", "幻花白帝", "审判之厅",
                                               "地底监狱", "幽冥冰窟", "死亡神殿"]
                
                while self.leveling_running:
                    # 检查是否需要停止
                    if self.stop_leveling_event.is_set():
                        self.add_level_log("带级已停止")
                        self.add_level_log("========== 带级结束 ==========")
                        self.leveling_running = False
                        self.start_level_btn.config(text="开始带级")
                        # 更新植物列表
                        self.root.after(0, self.load_plant_data)
                        return
                    
                    # 遍历好友列表，对每个好友一次性获取所有洞口数据
                    garden_found = False
                    
                    # 开始带级时先回收一次植物
                    self.add_level_log("正在回收植物...")
                    return_data = pvzall.user_plant_return_home(self.daqu, self.ck)
                    if "你正处于花园挂机状态！" in str(return_data):
                        self.add_level_log("检测到花园挂机状态，正在结束挂机...")
                        stop_auto_result = pvzall.user_vip_stopAuto(self.daqu, self.ck, "")
                        if stop_auto_result != "跳过" and stop_auto_result:
                            self.add_level_log(stop_auto_result)
                        pvzall.user_plant_return_home(self.daqu, self.ck)
                        self.add_level_log("成功结束挂机并回收植物")
                    elif "success" in str(return_data):
                        self.add_level_log("成功进行植物回家")
                    
                    for e in user_garden_id_list:
                        # 检查是否需要停止
                        if not self.leveling_running or self.stop_leveling_event.is_set():
                            self.add_level_log("带级已停止")
                            self.add_level_log("========== 带级结束 ==========")
                            self.leveling_running = False
                            self.start_level_btn.config(text="开始带级")
                            self.root.after(0, self.load_plant_data)
                            return
                        
                        # 只处理等级>60 的好友花园
                        if int(e[2]) <= 60:
                            continue
                        
                        garden_found = True
                        user_garden_id = e[0]
                        user_garden_grade = e[2]
                        garden_name = e[1]
                        
                        # 一次性获取当前好友的所有洞口数据
                        self.add_level_log(f"正在查看 {garden_name} 家的洞口情况（等级：{user_garden_grade}）")
                        public_data = pvzall.look_public(self.daqu, self.ck, user_garden_id, user_garden_grade)
                        
                        if not public_data or "跳过" in str(public_data):
                            self.add_level_log(f"查看 {garden_name} 家洞口失败，跳过")
                            continue
                        
                        # 取出植物现在数据（每次攻击前获取最新状态）
                        self.add_level_log("正在获取植物仓库数据...")
                        plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", "")
                        
                        if "跳过" in str(plant_up_data):
                            self.add_level_log("查询植物时丢包，跳过")
                            continue
                        
                        # 查看是否需要使用血瓶（植物没血了才用）
                        if potion_level != 0:
                            for main_plant_i in main_plant_list:
                                for plant_i in plant_up_data:
                                    if int(plant_i[0]) == int(main_plant_i[0]):
                                        if str(plant_i[5]) == "0":
                                            # 使用血瓶
                                            return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                            self.add_level_log(f"{name} {pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                            
                            for be_level_plant_i in be_level_plant_list:
                                for plant_i in plant_up_data:
                                    if int(plant_i[0]) == int(be_level_plant_i[0]):
                                        if str(plant_i[5]) == "0":
                                            # 使用血瓶
                                            return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                            self.add_level_log(f"{name} {pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                        
                        # 取出血量不为零的植物
                        plant_up_data = [sublist for sublist in plant_up_data if int(sublist[5]) != 0]
                        
                        # 取出不在光合作用的植物
                        plant_up_data = [sublist for sublist in plant_up_data if int(sublist[16]) == 0]
                        
                        # 排列子列表等级
                        plant_up_data = sorted(plant_up_data, key=lambda x: int(x[7]))
                        
                        # 取出被带植物最低的等级
                        be_level_plant_ids = {int(n[0]) for n in be_level_plant_list}
                        filtered_plant_up_data = [i for i in plant_up_data if int(i[0]) in be_level_plant_ids]
                        
                        try:
                            # 取出被带植物最低的等级
                            min_sublist = min(filtered_plant_up_data, key=lambda x: int(x[7]))
                            current_min_level = int(min_sublist[7])
                        except ValueError:
                            self.add_level_log("序列为空，无法求最小值")
                            continue
                        
                        # 检查是否达到目标等级
                        if current_min_level > target_level:
                            self.add_level_log(f"当前等级为:{current_min_level},已到达目标等级")
                            self.add_level_log("========== 带级结束 ==========")
                            self.leveling_running = False
                            self.start_level_btn.config(text="开始带级")
                            self.root.after(0, self.load_plant_data)
                            return
                        
                        self.add_level_log(f"当前最低等级为:{current_min_level},目标等级为:{target_level}")
                        
                        # 计算主力植物占用格子数
                        plant_Lattice_number = 0
                        for i in main_plant_list:
                            plant_Lattice_number += int(pvzall.Plant_width_by_name(i[1]))
                        
                        # 构建战斗列表
                        fight_list = []
                        for i in main_plant_list:
                            fight_list.append(i[0])
                        
                        self.add_level_log(f"主力植物占用格子数: {plant_Lattice_number}")
                        
                        # 取出符合条件的被带植物加入战斗列表
                        for i in plant_up_data:
                            if int(i[0]) in [int(n[0]) for n in be_level_plant_list]:
                                plant_Lattice_number += int(pvzall.Plant_width(int(i[1])))
                                if plant_Lattice_number <= 10:
                                    fight_list.append(i[0])
                                    self.add_level_log(f"当前进入列表宽度:{plant_Lattice_number}, 加入战斗列表:{i[0]}")
                                else:
                                    break
                        
                        fight_list = list(set(fight_list))
                        self.add_level_log(f"战斗列表: {fight_list}")
                        
                        # 初始化 return_challenge 变量，避免未赋值引用
                        return_challenge = None
                        
                        # 遍历当前好友的 Fixed_three_monsters_public 洞口
                        for cave_name in Fixed_three_monsters_public:
                            # 检查是否需要停止
                            if not self.leveling_running or self.stop_leveling_event.is_set():
                                self.add_level_log("带级已停止")
                                self.add_level_log("========== 带级结束 ==========")
                                self.leveling_running = False
                                self.start_level_btn.config(text="开始带级")
                                self.root.after(0, self.load_plant_data)
                                return
                            
                            # 从 public_data 中查找当前洞口
                            cave_info = None
                            for i in public_data:
                                if i[2] == cave_name:
                                    cave_info = i
                                    break
                            
                            # 如果洞口不存在或不在可攻击状态就跳过
                            if cave_info is None:
                                continue
                            
                            # 如果洞口在保护时间内就跳过
                            cave_id = cave_info[0]
                            cave_time = int(cave_info[1])
                            if cave_time > 0 and cave_time < 600:
                                continue
                            
                            # 如果洞口保护时间超过600秒（10分钟）
                            if cave_time > 600:
                                # 判断是否使用时之沙
                                if use_sand:
                                    return_txt = pvzall.user_useTimesands(self.daqu, self.ck, cave_id)
                                    if "已经可以挑战" in return_txt:
                                        self.add_level_log(f"{name} 对洞口{cave_name}使用时之沙成功！")
                                    else:
                                        continue
                                else:
                                    continue
                            
                            if cave_id is None:
                                continue
                            
                            # 攻击洞口
                            self.add_level_log(f"{name} 正在进攻 {garden_name} 家的 {cave_name} 洞口...")
                            return_challenge = pvzall.user_challenge(self.daqu, self.ck, fight_list, cave_id)
                            
                            # 打洞赢了返回奖励列表（列表格式）
                            if isinstance(return_challenge, list) and return_challenge:
                                # 构建奖励文本
                                reward_text = "获得"
                                for item in return_challenge:
                                    try:
                                        tool_name = pvzall.Tool_name(int(item['id']))
                                        reward_text += f" {item['amount']}个{tool_name}"
                                    except:
                                        reward_text += f" {item['amount']}个道具ID:{item['id']}"
                                self.add_level_log(f'{name} 在 {garden_name}家 进攻{cave_name}洞口成功！{reward_text}')
                                # 统计掉落物（传入原始列表数据）
                                self.parse_dropped_items(return_challenge)
                                # 更新炮灰植物列表中的等级
                                self.root.after(0, self.refresh_plant_levels)
                                # 成功后继续尝试下一个洞口
                                continue
                            
                            # 打洞赢了但奖励为空
                            elif isinstance(return_challenge, list) and not return_challenge:
                                self.add_level_log(f'{name} 在 {garden_name}家 进攻{cave_name}洞口成功！但未获得奖励')
                                # 更新炮灰植物列表中的等级
                                self.root.after(0, self.refresh_plant_levels)
                                # 成功后继续尝试下一个洞口
                                continue
                            
                            # 没有挑战书返回
                            elif return_challenge == "今日狩猎场挑战次数已达上限":
                                self.add_level_log(f'{name} 今日狩猎场挑战次数已达上限')
                                
                                # 如果选择不用挑战书，直接结束带级
                                if chall_book == "不用挑战书":
                                    self.add_level_log("已选择不用挑战书，结束带级")
                                    self.add_level_log("========== 带级结束 ==========")
                                    self.leveling_running = False
                                    self.start_level_btn.config(text="开始带级")
                                    self.root.after(0, self.load_plant_data)
                                    return
                                
                                # 使用挑战书后重试当前洞口
                                return_user_useOf = pvzall.user_useOf(self.daqu, self.ck, challenge_book_level, 3, "")
                                if "成功" in return_user_useOf:
                                    self.add_level_log(f'{name} {return_user_useOf},休息13秒避免频繁')
                                    time.sleep(13)
                                    # 重试当前洞口
                                    continue
                                elif "现在使用挑战书会浪费狩猎次数，再打几次僵尸吧！" in return_user_useOf:
                                    self.add_level_log(f'{name} {return_user_useOf}')
                                    # 跳过当前洞口，继续下一个
                                    continue
                            
                            # 僵尸已经被别人挑战，继续尝试下一个洞口
                            elif return_challenge == "僵尸已被其它人挑战了":
                                self.add_level_log(f'{name} 僵尸已被其它人挑战了')
                                continue
                            
                            # 给洞口主人留点机会，继续尝试下一个洞口
                            elif return_challenge == '给洞口主人留点机会':
                                self.add_level_log(f'{name} 给洞口主人留点机会')
                                continue
                            
                            # 战斗失败，继续尝试下一个洞口
                            elif return_challenge == '战斗失败':
                                self.add_level_log(f'{name} 进攻{cave_name}洞口失败！ {return_challenge}')
                                continue
                            
                            # 参与战斗的植物没血了，回血后重试当前洞口
                            elif return_challenge == '参与战斗的生物HP不能小于1':
                                self.add_level_log(f'{name} 参与战斗的生物HP不能小于1，正在使用血瓶...')
                                # 获取最新植物数据
                                plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", "")
                                if "跳过" not in str(plant_up_data):
                                    # 为所有没血的植物使用血瓶
                                    if potion_level != 0:
                                        for main_plant_i in main_plant_list:
                                            for plant_i in plant_up_data:
                                                if int(plant_i[0]) == int(main_plant_i[0]):
                                                    if str(plant_i[5]) == "0":
                                                        return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                                        self.add_level_log(f"{name} {pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                                        
                                        for be_level_plant_i in be_level_plant_list:
                                            for plant_i in plant_up_data:
                                                if int(plant_i[0]) == int(be_level_plant_i[0]):
                                                    if str(plant_i[5]) == "0":
                                                        return_txt = pvzall.plant_refreshHp(self.daqu, self.ck, str(plant_i[0]), potion_level)
                                                        self.add_level_log(f"{name} {pvzall.Plant_name(int(plant_i[0]))}({int(plant_i[0])}) {return_txt}")
                                # 重试当前洞口
                                continue
                            
                            # 请不要操作过于频繁，暂停后重试当前洞口
                            elif return_challenge == '请不要操作过于频繁':
                                self.add_level_log(f'{name} 请不要操作过于频繁,暂停14秒')
                                time.sleep(14)
                                # 重试当前洞口
                                continue
                            
                            # 不能用光合作用中的植物参战
                            elif return_challenge == '不能用光合作用中的植物参战':
                                self.add_level_log(f'{name} 不能用光合作用中的植物参战，正在回收植物')
                                pvzall.AMF_POST([], 'api.garden.organismReturnHome', 0, self.ck, self.daqu)
                                continue
                            
                            # 其他情况，继续尝试下一个洞口
                            else:
                                self.add_level_log(f"{name} 进攻结果: {return_challenge}")
                                continue
                        
                        # 遍历完当前好友的所有洞口后，继续处理下一个好友
                        # （不在循环内 break，让循环自然结束）
                
                self.add_level_log("========== 带级结束 ==========")
                self.leveling_running = False
                self.start_level_btn.config(text="开始带级")
                # 更新植物列表
                self.root.after(0, self.load_plant_data)
            else:
                self.add_level_log("未选择带级模式")
                self.add_level_log("========== 带级结束 ==========")
                self.leveling_running = False
                self.start_level_btn.config(text="开始带级")
                # 更新植物列表
                self.root.after(0, self.load_plant_data)
                return
            
            self.add_level_log("========== 带级结束 ==========")
            self.leveling_running = False
            self.start_level_btn.config(text="开始带级")
            # 更新植物列表
            self.root.after(0, self.load_plant_data)
        
        threading.Thread(target=run_leveling, daemon=True).start()
    
    def show_item_list_dialog(self):
        """显示累计掉落道具列表"""
        item_list_window = tk.Toplevel(self.root)
        item_list_window.title("累计掉落道具列表")
        item_list_window.geometry("400x300")
        
        # 创建列表框
        listbox = tk.Listbox(item_list_window)
        listbox.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        # 添加累计掉落道具数据
        if total_dropped_items:
            for tool_id, amount in total_dropped_items.items():
                try:
                    tool_name = pvzall.Tool_name(tool_id)
                except:
                    tool_name = f"道具ID:{tool_id}"
                listbox.insert(tk.END, f"{tool_name} x {amount}")
        else:
            listbox.insert(tk.END, "暂无掉落记录")
        
        # 关闭按钮
        close_btn = ttk.Button(item_list_window, text="关闭", command=item_list_window.destroy)
        close_btn.pack(pady=10)
    
    def learn_skill(self):
        """学习技能"""
        selected_items = self.table.selection()
        if not selected_items:
            messagebox.showwarning("警告", "请先选择一行数据！")
            return

        # 获取选中行的植物信息
        item = selected_items[0]
        values = self.table.item(item, "values")
        plant_id = values[1]  # 植物ID在第二列
        plant_name = values[2]  # 植物名字在第三列
        plant_level = values[3]  # 植物等级在第四列

        # 弹出新窗口显示植物信息
        self.plant_info_window = PlantInfoWindow(plant_id, plant_name, plant_level, self.ck, self.daqu, self.add_log)

    def forget_skill(self):
        """遗忘技能"""
        selected_items = self.table.selection()
        if not selected_items:
            messagebox.showwarning("警告", "请先选择一行数据！")
            return

        # 获取选中行的植物信息
        item = selected_items[0]
        values = self.table.item(item, "values")
        plant_name = values[2]  # 植物名字在第三列
        plant_id = values[1]  # 植物ID在第二列

        # 取出植物现在数据
        plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", "1")

        skills = ""
        for index_plant_up_data in plant_up_data:
            if int(index_plant_up_data[0]) == int(plant_id):
                skills = index_plant_up_data[37]
                break

        # 弹出"遗忘技能"窗口
        self.forget_skill_window = ForgetSkillWindow(plant_name, [skills, plant_id], self.ck, self.daqu, self.log_text)

    def upgrade_skill(self):
        """升级技能"""
        selected_items = self.table.selection()
        if not selected_items:
            messagebox.showwarning("警告", "请先选择一行数据！")
            return

        # 获取选中行的植物信息
        item = selected_items[0]
        values = self.table.item(item, "values")
        plant_name = values[2]  # 植物名字在第三列
        plant_id = values[1]  # 植物ID在第二列

        # 取出植物现在数据
        plant_up_data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "plant", "1")

        skills = ""
        for index_plant_up_data in plant_up_data:
            if int(index_plant_up_data[0]) == int(plant_id):
                skills = index_plant_up_data[37]
                break

        # 弹出"升级技能"窗口
        self.up_skill_window = UpgradeSkillWindow(plant_name, [skills, plant_id], self.ck, self.daqu, self.log_text)


# ------------------------------ GUI优化 ------------------------------ #
class Application(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title(f"{os.path.basename(os.getcwd())} - 日志界面")
        self.geometry("700x520")
        self.configure(padx=10, pady=10)

        # 线程安全控制
        self.lock = threading.Lock()  # 数据访问锁
        self.ui_update_queue = []  # UI更新队列
        self.running = False  # 运行状态标志

        # 目标玩家经验存储列表
        self.target_player = "萌新求罩298"
        self.target_player_exp_list = []

        # 核心：用户名(去空格) -> 表格行ID 映射字典
        self.name_to_item_id = {}

        # 创建主框架
        main_frame = tk.Frame(self)
        main_frame.pack(fill=tk.BOTH, expand=True, pady=10)

        # 添加菜单栏
        self.menu_bar = tk.Menu(self)
        self.config(menu=self.menu_bar)

        # 添加"日志操作"菜单
        self.log_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="日志操作", menu=self.log_menu)
        self.log_menu.add_command(label="清除日志", command=lambda: self.log_text.delete(1.0, tk.END))
        self.log_menu.add_command(label="保存日志", command=self.save_log_to_file)
        self.log_menu.add_separator()
        self.log_menu.add_command(label="滚到顶部", command=lambda: self.log_text.yview_moveto(0))
        self.log_menu.add_command(label="滚到底部", command=lambda: self.log_text.yview_moveto(1))

        # 添加"帮助"菜单
        self.help_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="帮助", menu=self.help_menu)
        self.help_menu.add_command(label="软件更新", command=self.show_update_info)
        self.help_menu.add_command(label="使用帮助", command=self.show_help)

        # 添加"社区功能"菜单
        self.community_menu = tk.Menu(self.menu_bar, tearoff=0)
        self.menu_bar.add_cascade(label="社区功能", menu=self.community_menu)
        self.community_menu.add_command(label="添加植物交流群1", command=self.join_group)
        self.community_menu.add_command(label="添加植物交流群2", command=self.join_group2)
        self.community_menu.add_separator()
        self.community_menu.add_command(label="留言板功能", command=self.message_board)
        self.community_menu.add_command(label="PVZOL基础介绍", command=self.pvz_intro)
        self.community_menu.add_command(label="查找联系人", command=self.view_friends)
        self.community_menu.add_command(label="同意添加好友", command=self.agree_add_friend)
        self.community_menu.add_command(label="充值记录", command=self.recharge_record)

        # 用户信息表格
        table_frame = tk.Frame(main_frame, width=500)
        table_frame.pack(fill=tk.BOTH, expand=False, padx=(0, 10))

        tk.Label(table_frame, text="用户信息", font=("Arial", 10, "bold")).pack(anchor=tk.W, pady=5)

        # 表格列定义，新增friends_count列和item_count列
        columns = ("index", "name", "garden_id", "daqu", "level", "status", "completed", "today_exp", "friends_count", "item_count")
        self.user_table = ttk.Treeview(table_frame, columns=columns, show="headings", height=10)

        # 设置表头
        self.user_table.heading("index", text="序号")
        self.user_table.heading("name", text="名字")
        self.user_table.heading("garden_id", text="花园ID")
        self.user_table.heading("daqu", text="大区")
        self.user_table.heading("level", text="等级")
        self.user_table.heading("status", text="状态")
        self.user_table.heading("completed", text="任务状态")
        self.user_table.heading("today_exp", text="今日经验")
        self.user_table.heading("friends_count", text="好友数量")
        self.user_table.heading("item_count", text="品刷数量")

        # 设置列宽
        self.user_table.column("index", width=50, anchor="center")
        self.user_table.column("name", width=60)
        self.user_table.column("garden_id", width=80, anchor="center")
        self.user_table.column("daqu", width=60, anchor="center")
        self.user_table.column("level", width=60, anchor="center")
        self.user_table.column("status", width=80, anchor="center")
        self.user_table.column("completed", width=80, anchor="center")
        self.user_table.column("today_exp", width=80, anchor="center")
        self.user_table.column("friends_count", width=100, anchor="center")
        self.user_table.column("item_count", width=80, anchor="center")

        # 表格滚动条
        table_scroll = tk.Scrollbar(table_frame, orient="vertical", command=self.user_table.yview)
        table_scroll.pack(side=tk.RIGHT, fill=tk.Y)
        self.user_table.configure(yscrollcommand=table_scroll.set)

        # 表格标签样式
        self.user_table.tag_configure("offline", foreground="gray")
        self.user_table.tag_configure("online", foreground="black")
        self.user_table.tag_configure("completed", foreground="green")  # 已完成-绿色
        self.user_table.tag_configure("pending", foreground="orange")   # 未完成-橙色

        self.user_table.pack(fill=tk.BOTH, expand=True)

        # 右键菜单
        self.context_menu = tk.Menu(self, tearoff=0)
        self.context_menu.add_command(label="进入游戏", command=self.open_game)
        self.context_menu.add_command(label="管理植物", command=self.open_plant_manager)
        self.context_menu.add_command(label="删除用户", command=self.delete_user)
        self.context_menu.add_separator()
        self.context_menu.add_command(label="领取每日任务", command=self.claim_daily_task)
        self.context_menu.add_command(label="花园植物回家", command=self.plant_go_home)
        self.context_menu.add_command(label="重置副本任务", command=self.reset_fuben)
        self.context_menu.add_command(label="强制进入活动", command=self.force_enter_activity)
        self.context_menu.add_command(label="开启仓库格子", command=self.open_warehouse)
        # 绑定右键事件（兼容Mac和Windows）
        self.user_table.bind("<Button-3>", self.show_context_menu)  # Windows/Linux右键
        self.user_table.bind("<Button-2>", self.show_context_menu)  # 某些Linux系统
        self.user_table.bind("<Control-Button-1>", self.show_context_menu)  # Mac上Ctrl+左键
        
        # 日志区域（放在用户数据表格下方）
        log_frame = tk.Frame(main_frame, height=190)
        log_frame.pack(fill=tk.BOTH, expand=False, pady=(10, 0))
        log_frame.pack_propagate(False)

        # 日志滚动条
        scrollbar = tk.Scrollbar(log_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

        # 日志文本框
        self.log_text = tk.Text(log_frame, width=80, wrap=tk.WORD,
                                yscrollcommand=scrollbar.set)
        self.log_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        self.log_text.tag_config("error", foreground="red")
        self.log_text.tag_config("info", foreground="blue")
        self.log_text.tag_config("success", foreground="green")
        self.log_text.tag_config("target_exp", foreground="purple", font=("Arial", 9, "bold"))
        self.log_text.tag_config("reset", foreground="#009688", font=("Arial", 9, "bold"))  # 重置日志-青绿色

        scrollbar.config(command=self.log_text.yview)

        # 底部控制栏
        control_frame = tk.Frame(self)
        control_frame.pack(fill=tk.X, pady=5)

        # 添加用户按钮
        self.add_user_btn = ttk.Button(control_frame, text="添加用户", command=self.show_add_user_window)
        self.add_user_btn.pack(side=tk.RIGHT, padx=5)

        # 更换头像按钮
        self.change_avatar_btn = ttk.Button(control_frame, text="更换头像", command=self.show_change_avatar_window)
        self.change_avatar_btn.pack(side=tk.RIGHT, padx=5)

        # 刷新按钮
        self.refresh_btn = ttk.Button(control_frame, text="刷新用户", command=self.refresh_user_table)
        self.refresh_btn.pack(side=tk.RIGHT, padx=5)

        # 运行按钮
        self.run_btn = ttk.Button(control_frame, text="开始运行", command=self.start_main_thread)
        self.run_btn.pack(side=tk.RIGHT, padx=5)

        # 线程控制
        self.main_thread = None

        # 存储用户数据
        self.user_data_list = []

        # XML缓存（限制大小）
        self.xml_cache = {}
        self.MAX_CACHE_SIZE = 50  # 限制最大缓存数量

        # 初始化加载用户数据
        self.refresh_user_table()

        # 关键：初始化每日凌晨2点重置调度（核心功能）
        self.setup_daily_reset()

        # 启动UI更新处理循环
        self.process_ui_updates()

    def _create_radio_group(self, parent, label_text, options, var):
        """创建单选框组的通用方法"""
        frame = tk.Frame(parent)
        frame.pack(side=tk.LEFT, padx=5)

        tk.Label(frame, text=label_text).pack(side=tk.LEFT)
        for text, value in options:
            tk.Radiobutton(frame, text=text, variable=var, value=value).pack(side=tk.LEFT, padx=2)

    def update_single_user_row(self, username):
        """基于映射直接更新表格行，全流程去隐形字符"""
        username = username.strip()
        target_item = self.name_to_item_id.get(username)

        if not target_item:
            self.safe_log(f"未找到用户 {username} 的表格行，无法更新\n", "error")
            return

        def _update_ui():
            with self.lock:
                user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
                if not user_info:
                    self.safe_log(f"未找到用户 {username} 的信息，跳过更新\n", "error")
                    return

                # 严格：仅经验满且completed为True，才显示已完成；否则强制未完成
                status_text = "已完成" if user_info.get("completed", False) else "未完成"
                status_tag = "completed" if user_info.get("completed", False) else "pending"
                account_status = user_info.get("status", "离线")
                account_tag = "offline" if account_status == "离线" else "online"
                tags = (account_tag, status_tag)

                # 格式化经验显示
                today_exp = user_info.get("today_exp", "")
                if isinstance(today_exp, (list, tuple)) and len(today_exp) >= 2:
                    today_exp_display = f"{today_exp[0]}/{today_exp[1]}"
                else:
                    today_exp_display = str(today_exp)

                # 计算用户序号
                sorted_users = sorted(self.user_data_list, key=lambda x: int(x.get("level", "0")) if str(x.get("level", "0")).isdigit() else 0, reverse=True)
                index = next((i+1 for i, u in enumerate(sorted_users) if u["name"].strip() == username), 0)

                # 组装行数据（所有字段去隐形字符）
                row_values = (
                    index,
                    username,
                    user_info.get("garden_id", "").strip(),
                    user_info.get("daqu", "").strip(),
                    user_info.get("level", "未知").strip(),
                    account_status,
                    status_text,
                    today_exp_display,
                    user_info.get("friends_count", "").strip(),
                    user_info.get("item_count", 0)
                )

            # 直接更新行，强制刷新UI
            self.user_table.item(target_item, values=row_values, tags=tags)
            self.user_table.update_idletasks()

        if threading.current_thread() is threading.main_thread():
            _update_ui()
        else:
            self.after(0, _update_ui)

    def refresh_user_table1(self):
        """全量刷新表格，重建用户名-行ID映射"""
        self.user_table.delete(*self.user_table.get_children())
        self.name_to_item_id.clear()

        with self.lock:
            sorted_users = sorted(self.user_data_list, key=lambda x: int(x["level"].strip()) if str(x["level"]).strip().isdigit() else 0, reverse=True)

        for i, user_info in enumerate(sorted_users, 1):
            # 刷新表格时，严格按completed字段显示任务状态
            status_text = "已完成" if user_info["completed"] else "未完成"
            status_tag = "completed" if user_info["completed"] else "pending"
            account_status = user_info["status"]
            account_tag = "offline" if account_status == "离线" else "online"
            tags = (account_tag, status_tag)

            today_exp = user_info.get("today_exp", "")
            if isinstance(today_exp, (list, tuple)) and len(today_exp) >= 2:
                today_exp_display = f"{today_exp[0]}/{today_exp[1]}"
            else:
                today_exp_display = today_exp

            # 所有字段去隐形字符
            username = user_info["name"].strip()
            garden_id = user_info["garden_id"].strip()
            daqu = user_info["daqu"].strip()
            level = user_info["level"].strip()

            # 组装行数据
            row_values = (
                i,
                username,
                garden_id,
                daqu,
                level,
                account_status,
                status_text,
                today_exp_display,
                user_info.get("friends_count", "").strip(),
                user_info.get("item_count", 0)
            )
            # 插入行并建立映射
            item_id = self.user_table.insert("", tk.END, values=row_values, tags=tags)
            self.name_to_item_id[username] = item_id

        self.user_table.update_idletasks()
        self.user_table.yview_moveto(0)

    def refresh_user_table_level(self, level):
        """保留方法，兼容原有逻辑"""
        with self.lock:
            sorted_users = sorted(self.user_data_list, key=lambda x: int(x["level"].strip()) if str(x["level"]).strip().isdigit() else 0, reverse=True)

        item_count = len(self.user_table.get_children())
        user_count = len(sorted_users)

        for i, user_info in enumerate(sorted_users, 1):
            status_text = "已完成" if user_info["completed"] else "未完成"
            status_tag = "completed" if user_info["completed"] else "pending"
            account_status = user_info["status"]
            account_tag = "offline" if account_status == "离线" else "online"
            tags = (account_tag, status_tag)

            today_exp = user_info.get("today_exp", "")
            if isinstance(today_exp, (list, tuple)) and len(today_exp) >= 2:
                today_exp_display = f"{today_exp[0]}/{today_exp[1]}"
            else:
                today_exp_display = today_exp

            username = user_info["name"].strip()
            garden_id = user_info["garden_id"].strip()
            daqu = user_info["daqu"].strip()

            row_values = (
                i,
                username,
                garden_id,
                daqu,
                level.strip(),
                account_status,
                status_text,
                today_exp_display,
                user_info.get("friends_count", "").strip()
            )

            if i <= item_count:
                item = self.user_table.get_children()[i - 1]
                self.user_table.item(item, values=row_values, tags=tags)
            else:
                item_id = self.user_table.insert("", tk.END, values=row_values, tags=tags)
                self.name_to_item_id[username] = item_id

        if item_count > user_count:
            for item in self.user_table.get_children()[user_count:]:
                self.user_table.delete(item)
        self.user_table.update_idletasks()

    def refresh_user_table(self):
        """全量刷新用户表格，加锁确保数据同步"""
        with self.lock:
            self.user_data_list.clear()
            self.xml_cache.clear()
        self.scan_xml_files()
        self.refresh_user_table1()
        self.safe_log(f"用户表格刷新完成，共加载 {len(self.user_data_list)} 个用户\n", "info")

    def show_add_user_window(self):
        """显示添加用户的弹出窗口"""
        # 创建弹出窗口
        add_user_window = tk.Toplevel(self)
        add_user_window.title("添加用户")
        add_user_window.geometry("350x200")
        add_user_window.resizable(False, False)

        # 第一行：邮箱
        email_frame = tk.Frame(add_user_window)
        email_frame.pack(fill=tk.X, padx=10, pady=5)
        email_frame.columnconfigure(0, weight=1)
        email_frame.columnconfigure(1, weight=3)
        
        tk.Label(email_frame, text="邮箱：").grid(row=0, column=0, sticky=tk.E, padx=5)
        email_entry = ttk.Entry(email_frame, width=25)
        email_entry.grid(row=0, column=1, sticky=tk.W, padx=5)

        # 第二行：密码
        password_frame = tk.Frame(add_user_window)
        password_frame.pack(fill=tk.X, padx=10, pady=5)
        password_frame.columnconfigure(0, weight=1)
        password_frame.columnconfigure(1, weight=3)
        
        tk.Label(password_frame, text="密码：").grid(row=0, column=0, sticky=tk.E, padx=5)
        password_entry = ttk.Entry(password_frame, width=25, show="*")
        password_entry.grid(row=0, column=1, sticky=tk.W, padx=5)

        # 第三行：大区
        zone_frame = tk.Frame(add_user_window)
        zone_frame.pack(fill=tk.X, padx=10, pady=5)
        zone_frame.columnconfigure(0, weight=1)
        zone_frame.columnconfigure(1, weight=3)
        
        tk.Label(zone_frame, text="大区：").grid(row=0, column=0, sticky=tk.E, padx=5)
        zone_entry = ttk.Entry(zone_frame, width=25)
        zone_entry.grid(row=0, column=1, sticky=tk.W, padx=5)
        zone_entry.insert(0, "43")  # 默认大区

        # 第四行：按钮
        button_frame = tk.Frame(add_user_window)
        button_frame.pack(fill=tk.X, padx=10, pady=15)
        
        def on_register():
            """注册按钮点击事件"""
            self.safe_log("注册功能尚未实现\n", "info")

        def on_login():
            """登录按钮点击事件"""
            email = email_entry.get().strip()
            password = password_entry.get().strip()
            zone_id = zone_entry.get().strip()

            if not email or not password or not zone_id:
                self.safe_log("请填写完整的登录信息\n", "error")
                return

            self.safe_log(f"正在登录，邮箱：{email}，大区：{zone_id}\n", "info")

            # 获取cookies
            cookies = pvzall.Get_cookie(email, password, zone_id)
            if cookies == "密码错误":
                self.safe_log("登录失败：密码错误\n", "error")
                return
            if isinstance(cookies, str) and "错误" in cookies:
                self.safe_log(f"登录失败：{cookies}\n", "error")
                return

            self.safe_log("获取cookies成功\n", "info")

            # 获取种子
            result = pvzall.Seed_Program(zone_id, cookies)
            if result == "跳过":
                self.safe_log("获取种子失败\n", "error")
                return

            self.safe_log("获取种子成功\n", "info")

            # 刷新用户列表
            self.refresh_user_table()
            self.safe_log("用户列表已更新\n", "info")

            # 关闭窗口
            add_user_window.destroy()

        register_btn = ttk.Button(button_frame, text="注册", command=on_register)
        register_btn.pack(side=tk.LEFT, padx=10, expand=True)
        
        login_btn = ttk.Button(button_frame, text="登录", command=on_login)
        login_btn.pack(side=tk.RIGHT, padx=10, expand=True)

        # 居中显示窗口
        add_user_window.transient(self)
        add_user_window.grab_set()
        self.wait_window(add_user_window)

    def show_change_avatar_window(self):
        """显示更换头像的弹出窗口"""
        import webbrowser

        # 创建弹出窗口
        change_avatar_window = tk.Toplevel(self)
        change_avatar_window.title("更换头像")
        change_avatar_window.geometry("400x220")
        change_avatar_window.resizable(False, False)

        # 使用grid布局，设置padding
        change_avatar_window.grid_columnconfigure(0, weight=1)
        change_avatar_window.grid_columnconfigure(1, weight=1)
        change_avatar_window.grid_columnconfigure(2, weight=1)
        change_avatar_window.grid_rowconfigure(0, weight=1)
        change_avatar_window.grid_rowconfigure(1, weight=1)
        change_avatar_window.grid_rowconfigure(2, weight=1)
        change_avatar_window.grid_rowconfigure(3, weight=1)

        # 邮箱行
        tk.Label(change_avatar_window, text="邮箱：").grid(row=0, column=0, sticky=tk.E, pady=12, padx=(40, 5))
        email_entry = ttk.Entry(change_avatar_window, width=30)
        email_entry.grid(row=0, column=1, columnspan=2, sticky=tk.W, pady=12, padx=(5, 40))

        # 密码行
        tk.Label(change_avatar_window, text="密码：").grid(row=1, column=0, sticky=tk.E, pady=12, padx=(40, 5))
        password_entry = ttk.Entry(change_avatar_window, width=30, show="*")
        password_entry.grid(row=1, column=1, columnspan=2, sticky=tk.W, pady=12, padx=(5, 40))

        def on_change_avatar():
            """更换头像按钮点击事件"""
            import subprocess
            import tempfile
            email = email_entry.get().strip()
            password = password_entry.get().strip()

            if not email or not password:
                self.safe_log("请填写邮箱和密码\n", "error")
                return

            self.safe_log(f"正在获取头像URL，邮箱：{email}\n", "info")

            # 调用pvzall.get_face_url获取头像URL和cookies
            try:
                result = pvzall.get_face_url(email, password)
                face_url, cookies = result

                if face_url and face_url != "密码错误":
                    self.safe_log(f"获取头像URL成功，正在打开浏览器...\n", "info")

                    # 将cookies转换为字符串格式
                    cookie_str = "; ".join([f"{k}={v}" for k, v in cookies.items()])
                    
                    # 创建临时cookie文件
                    cookie_file = tempfile.mktemp(suffix='.txt')
                    with open(cookie_file, 'w', encoding='utf-8') as f:
                        f.write(cookie_str)

                    # 获取程序所在目录
                    if hasattr(sys, '_MEIPASS'):
                        app_dir = sys._MEIPASS
                    else:
                        app_dir = os.path.dirname(os.path.abspath(sys.argv[0]))

                    script_path = os.path.join(app_dir, "run_browser.sh")
                    subprocess.Popen([script_path, face_url, "更换头像", cookie_file])
                    
                    self.safe_log(f"正在打开头像更换页面: {face_url}\n", "info")
                elif face_url == "密码错误":
                    self.safe_log("登录失败：密码错误\n", "error")
                else:
                    self.safe_log("获取头像URL失败\n", "error")
            except Exception as e:
                self.safe_log(f"获取头像URL出错：{e}\n", "error")

        # 按钮行
        change_btn = ttk.Button(change_avatar_window, text="开始更改头像", command=on_change_avatar)
        change_btn.grid(row=2, column=0, columnspan=3, pady=15)

        # 居中显示窗口
        change_avatar_window.transient(self)
        change_avatar_window.grab_set()
        self.wait_window(change_avatar_window)

    def show_context_menu(self, event):
        """显示右键菜单"""
        # 获取点击位置的行
        item = self.user_table.identify_row(event.y)
        if item:
            # 设置选中状态
            self.user_table.selection_set(item)
            # 获取用户信息用于日志
            values = self.user_table.item(item, "values")
            if values:
                username = values[1] if len(values) > 1 else "未知用户"
                self.safe_log(f"右键点击用户: {username}\n", "info")
            # 显示右键菜单
            try:
                self.context_menu.post(event.x_root, event.y_root)
            except Exception as e:
                self.safe_log(f"显示右键菜单失败: {e}\n", "error")
        else:
            self.safe_log("右键点击位置不在表格行上\n", "info")

    def open_game(self):
        """打开游戏页面"""
        import subprocess
        import tempfile
        selected_items = self.user_table.selection()
        if selected_items:
            item = selected_items[0]
            values = self.user_table.item(item, "values")
            username = values[1]
            with self.lock:
                user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
            if user_info:
                daqu = user_info.get("daqu", "43")
                ck = user_info.get("ck", "")
                url = f"http://s{daqu}.youkia.pvz.youkia.com/pvz/index.php/default/main"
                self.safe_log(f"正在为 {username} 打开浏览器\n", "info")
                # self.safe_log(f"[DEBUG] Cookie length: {len(ck)}\n", "info")
                # self.safe_log(f"[DEBUG] Cookie preview: {ck[:200] if ck else 'empty'}\n", "info")
                
                cookie_file = tempfile.mktemp(suffix='.txt')
                with open(cookie_file, 'w', encoding='utf-8') as f:
                    f.write(ck)
                
                # 获取程序所在目录
                if hasattr(sys, '_MEIPASS'):
                    app_dir = sys._MEIPASS
                else:
                    app_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
                
                script_path = os.path.join(app_dir, "run_browser.sh")
                subprocess.Popen([script_path, url, f"植物大战僵尸 - {username}", cookie_file])

    def delete_user(self):
        """删除用户：从表格、内存数据和磁盘文件中移除"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中要删除的用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        # 弹出确认对话框
        import tkinter.messagebox as messagebox
        confirm = messagebox.askyesno("确认删除", f"确定要删除用户 {username} 吗？\n删除后将无法恢复，且会删除对应的XML文件。")
        
        if not confirm:
            self.safe_log(f"用户取消删除: {username}\n", "info")
            return
        
        # 获取用户信息
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        # 删除XML文件
        file_path = user_info.get("file_path", "")
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
                self.safe_log(f"已删除用户文件: {os.path.basename(file_path)}\n", "info")
            except Exception as e:
                self.safe_log(f"删除文件失败: {e}\n", "error")
        
        # 从内存数据中删除
        with self.lock:
            self.user_data_list = [u for u in self.user_data_list if u["name"].strip() != username]
            # 从缓存中删除
            if file_path in self.xml_cache:
                del self.xml_cache[file_path]
            # 从名字映射中删除
            if username in self.name_to_item_id:
                del self.name_to_item_id[username]
        
        # 从表格中删除行
        self.user_table.delete(item)
        
        # 刷新表格序号
        self.refresh_user_table1()
        
        self.safe_log(f"用户 {username} 已成功删除\n", "success")

    def claim_daily_task(self):
        """领取每日任务奖励"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        daqu = user_info.get("daqu", "43")
        ck = user_info.get("ck", "")
        
        def run_task():
            self.safe_log(f"正在为 {username} 领取每日任务奖励...\n", "info")
            try:
                pvzall.body_get_reward(daqu, ck, self.log_text)
                self.safe_log(f"{username} 领取每日任务完成\n", "success")
                self.after(0, lambda: messagebox.showinfo("成功", f"{username} 领取每日任务完成！"))
            except Exception as e:
                error_msg = str(e)
                self.safe_log(f"{username} 领取每日任务失败: {error_msg}\n", "error")
                self.after(0, lambda: messagebox.showwarning("警告", f"领取每日任务失败: {error_msg}"))
        
        import threading
        thread = threading.Thread(target=run_task, daemon=True)
        thread.start()

    def plant_go_home(self):
        """花园植物回家"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        daqu = user_info.get("daqu", "43")
        ck = user_info.get("ck", "")
        
        def run_task():
            self.safe_log(f"正在为 {username} 执行花园植物回家...\n", "info")
            try:
                result = pvzall.user_plant_go_home(daqu, ck, self.log_text)
                if result == "跳过":
                    self.safe_log(f"{username} 花园植物回家被跳过\n", "info")
                else:
                    self.safe_log(f"{username} {result}\n", "success")
                    self.after(0, lambda: messagebox.showinfo("成功", "光合作用完成的植物已回家！"))
            except Exception as e:
                error_msg = str(e)
                self.safe_log(f"{username} 花园植物回家失败: {error_msg}\n", "error")
        
        import threading
        thread = threading.Thread(target=run_task, daemon=True)
        thread.start()

    def reset_fuben(self):
        """重置副本任务"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        daqu = user_info.get("daqu", "43")
        ck = user_info.get("ck", "")
        
        def run_task():
            self.safe_log(f"正在为 {username} 重置副本任务...\n", "info")
            try:
                pvzall.Reset_All_Daily_Task(daqu, ck)
                self.safe_log(f"{username} 重置副本任务完成\n", "success")
                self.after(0, lambda: messagebox.showinfo("成功", "副本已重置！"))
            except Exception as e:
                error_msg = str(e)
                self.safe_log(f"{username} 重置副本任务失败: {error_msg}\n", "error")
        
        import threading
        thread = threading.Thread(target=run_task, daemon=True)
        thread.start()

    def force_enter_activity(self):
        """强制进入活动"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        daqu = user_info.get("daqu", "43")
        ck = user_info.get("ck", "")
        
        def run_task():
            self.safe_log(f"正在为 {username} 强制进入活动...\n", "info")
            try:
                url = pvzall.force_enter_activity(daqu, ck)
                if url:
                    self.safe_log(f"{username} 强制进入活动成功: {url}\n", "success")
                    webbrowser.open(url)
                else:
                    self.safe_log(f"{username} 强制进入活动失败，未获取到活动URL\n", "error")
            except Exception as e:
                error_msg = str(e)
                self.safe_log(f"{username} 强制进入活动失败: {error_msg}\n", "error")
        
        import threading
        thread = threading.Thread(target=run_task, daemon=True)
        thread.start()

    def open_warehouse(self):
        """开启仓库格子，直到192个"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        daqu = user_info.get("daqu", "43")
        ck = user_info.get("ck", "")
        
        def run_task():
            self.safe_log(f"正在为 {username} 开启仓库格子...\n", "info")
            try:
                for _ in range(192):
                    result = pvzall.new_user_open_Warehouse(daqu, ck, self.log_text)
                    if result == "跳过":
                        self.safe_log(f"{username} 仓库格子开启终止\n", "info")
                        break
                self.safe_log(f"{username} 仓库格子开启完成\n", "success")
                import tkinter.messagebox as messagebox
                self.after(0, lambda: messagebox.showinfo("成功", f"{username} 仓库格子开启完成！"))
            except Exception as e:
                error_msg = str(e)
                self.safe_log(f"{username} 开启仓库格子失败: {error_msg}\n", "error")
        
        import threading
        thread = threading.Thread(target=run_task, daemon=True)
        thread.start()

    def open_plant_manager(self):
        """打开植物管理窗口"""
        selected_items = self.user_table.selection()
        if not selected_items:
            self.safe_log("请先选中用户\n", "error")
            return
        
        item = selected_items[0]
        values = self.user_table.item(item, "values")
        username = values[1] if len(values) > 1 else "未知用户"
        
        with self.lock:
            user_info = next((u for u in self.user_data_list if u["name"].strip() == username), None)
        
        if not user_info:
            self.safe_log(f"未找到用户 {username} 的信息\n", "error")
            return
        
        # 启动植物管理窗口
        self.plant_manager = PlantManagerWindow(user_info, self)

    def scan_xml_files(self):
        """扫描并缓存XML用户文件，字段去隐形字符"""
        current_files = set()

        # 获取程序所在目录（支持打包后运行）
        if hasattr(sys, '_MEIPASS'):
            # 打包运行时
            app_dir = sys._MEIPASS
        else:
            # 开发运行时
            app_dir = os.path.dirname(os.path.abspath(sys.argv[0]))

        # 收集所有需要处理的XML文件路径
        files_to_process = []
        
        # 扫描程序所在目录
        for file in os.listdir(app_dir):
            if file.endswith('.xml') and "youkia" in file:
                file_path = os.path.join(app_dir, file)
                current_files.add(file_path)
                files_to_process.append(file_path)

        # 扫描Config子目录（Seed_Program生成的文件保存在这里）
        config_dir = os.path.join(app_dir, "Config")
        if os.path.exists(config_dir) and os.path.isdir(config_dir):
            for file in os.listdir(config_dir):
                if file.endswith('.xml') and "youkia" in file:
                    file_path = os.path.join(config_dir, file)
                    current_files.add(file_path)
                    files_to_process.append(file_path)

        # 处理所有收集到的文件
        for file_path in files_to_process:
            file = os.path.basename(file_path)
            try:
                file_mtime = os.path.getmtime(file_path)
            except OSError as e:
                self.safe_log(f"获取文件{file}修改时间失败：{e}\n", "error")
                continue

            with self.lock:
                if file_path in self.xml_cache:
                    cached_mtime, cached_user = self.xml_cache[file_path]
                    if abs(file_mtime - cached_mtime) < 1:
                        if cached_user:
                            cached_user["completed"] = False  # 新用户/缓存用户默认未完成
                            cached_user["status"] = "在线"
                            cached_user.setdefault("today_exp", "")
                            cached_user.setdefault("friends_count", "")
                            cached_user.setdefault("item_count", 0)
                            cached_user.setdefault("daily_task_done", False)
                            cached_user["name"] = cached_user["name"].strip()
                            self.user_data_list.append(cached_user)
                        continue

            user_info = self.parse_user_xml(file_path)
            if user_info:
                user_info["completed"] = False  # 初始状态强制未完成
                user_info["status"] = "在线"
                user_info["today_exp"] = ""
                user_info["friends_count"] = ""
                user_info["item_count"] = 0
                user_info["daily_task_done"] = False
                with self.lock:
                    self.user_data_list.append(user_info)
                    if len(self.xml_cache) >= self.MAX_CACHE_SIZE:
                        oldest_key = next(iter(self.xml_cache.keys()))
                        del self.xml_cache[oldest_key]
                        self.xml_cache[file_path] = (file_mtime, user_info)

        with self.lock:
            for cached_path in list(self.xml_cache.keys()):
                if cached_path not in current_files:
                    del self.xml_cache[cached_path]

    def parse_user_xml(self, file_path):
        """解析XML，所有字段strip()去隐形字符"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()

            root = ET.fromstring(content)

            # 安全获取标签内容并去隐形字符
            name = root.findtext("UserName", "").strip()
            level = root.findtext("UserLevel", "").strip()
            ck = root.findtext("UserCookies", "").strip()
            url = root.findtext("UserDomain", "").strip()
            account = root.findtext("UserAccount", "").strip()

            if not account:
                match = re.search(r'youkia_(.*?)\.xml', file_path)
                account = match.group(1).strip() if match else "未知账号"

            # 提取花园ID
            garden_id = ""
            garden_match = re.search(r'_(\d+)\.xml$', file_path)
            if garden_match:
                garden_id = garden_match.group(1).strip()
            else:
                self.safe_log(f"用户文件 {os.path.basename(file_path)} 花园ID解析失败\n", tag="error")
                return None

            # 提取大区
            match = re.search(r's(\d+)', url)
            if not match:
                self.safe_log(f"用户文件 {os.path.basename(file_path)} 大区解析失败\n", tag="error")
                return None
            daqu = match.group(1).strip()

            if not name:
                self.safe_log(f"用户文件 {os.path.basename(file_path)} 用户名解析为空，跳过\n", tag="error")
                return None

            return {
                "account": account,
                "name": name,
                "garden_id": garden_id,
                "daqu": daqu,
                "ck": ck,
                "file_path": file_path,
                "level": level
            }

        except ParseError as e:
            self.safe_log(
                f"XML解析错误：文件 {os.path.basename(file_path)}，行 {e.lineno}，列 {e.colno}：{e.msg}\n",
                tag="error"
            )
            return None
        except Exception as e:
            self.safe_log(f"解析文件 {os.path.basename(file_path)} 失败: {str(e)}\n", tag="error")
            return None

    def start_main_thread(self):
        """安全启动主线程"""
        if self.running:
            return

        self.running = True
        self.main_thread = threading.Thread(
            target=main,
            args=(self,),
            daemon=True
        )
        self.main_thread.start()
        self.run_btn.config(state=tk.DISABLED)
        self.after(100, self.check_thread_status)

    def check_thread_status(self):
        """检查线程状态并更新UI"""
        if not self.running or (self.main_thread and not self.main_thread.is_alive()):
            self.running = False
            self.run_btn.config(state=tk.NORMAL)
            self.safe_log("主进程已停止，可重新点击开始运行\n", "info")
        else:
            self.after(100, self.check_thread_status)

    def safe_log(self, message, tag=None):
        """线程安全的日志输出，统一时间戳"""
        def _log():
            now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            self.log_text.insert(tk.END, f"{now} {message}", tag)

            # 限制日志行数，避免卡顿
            line_count = int(self.log_text.index(tk.END).split('.')[0])
            if line_count > 800:
                self.log_text.delete('1.0', f'{line_count - 800}.0')

            self.log_text.see(tk.END)

        if threading.current_thread() is threading.main_thread():
            _log()
        else:
            with self.lock:
                self.ui_update_queue.append(_log)

    def save_log_to_file(self):
        """保存日志到文件"""
        from tkinter import filedialog
        import datetime
        file_path = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("文本文件", "*.txt"), ("所有文件", "*.*")],
            initialfile=f"log_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        )
        if file_path:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(self.log_text.get(1.0, tk.END))
                self.safe_log(f"日志已保存到: {os.path.basename(file_path)}\n", "success")
            except Exception as e:
                self.safe_log(f"保存日志失败: {e}\n", "error")

    def show_update_info(self):
        """显示软件更新信息"""
        update_info = """【软件更新说明】

版本: 1.0.0
日期: 2026-06-06

更新内容:
- 新增日志顶部操作菜单栏
- 新增清除日志、保存日志功能
- 新增滚到顶部、滚到底部功能
- 新增软件更新和帮助按钮
- 优化用户界面交互体验

敬请期待更多功能！"""
        messagebox.showinfo("软件更新", update_info)

    def show_help(self):
        """显示帮助信息"""
        help_info = """【使用帮助】

1. 添加用户
   点击"添加用户"按钮，输入邮箱、密码和大区ID

2. 刷新用户
   点击"刷新用户"按钮更新用户列表

3. 开始运行
   选中用户后点击"开始运行"启动自动化任务

4. 右键菜单
   在用户列表右键可打开更多操作选项

5. 日志操作
   - 清除日志：清空所有日志记录
   - 保存日志：将日志保存为文本文件
   - 滚到顶部/底部：快速定位日志位置

6. 软件更新
   点击"软件更新"按钮查看最新版本信息

如有其他问题，请联系开发者。"""
        messagebox.showinfo("帮助", help_info)

    def join_group(self):
        """添加植物交流群1"""
        import webbrowser
        url = "https://jq.qq.com/?_wv=1027&k=3gAXiCUm"
        webbrowser.open(url)

    def join_group2(self):
        """添加植物交流群2"""
        import webbrowser
        url = "https://qm.qq.com/q/lO67bOjfMY"
        webbrowser.open(url)

    def message_board(self):
        """留言板功能"""
        import webbrowser
        url = "http://www.youkia.com/index.php/news/read?id=115"
        webbrowser.open(url)

    def pvz_intro(self):
        """PVZOL基础介绍"""
        import webbrowser
        url = "http://www.youkia.com/index.php/news/read?id=115"
        webbrowser.open(url)

    def view_friends(self):
        """查找联系人"""
        import webbrowser
        url = "http://www.youkia.com/index.php/home/search"
        webbrowser.open(url)

    def agree_add_friend(self):
        """同意添加好友"""
        import webbrowser
        url = "http://www.youkia.com/index.php/home/event"
        webbrowser.open(url)

    def recharge_record(self):
        """充值记录"""
        import webbrowser
        url = "http://www.youkia.com/index.php/purse/topuplist"
        webbrowser.open(url)

    def process_ui_updates(self):
        """处理UI更新队列，确保主线程执行"""
        if self.ui_update_queue:
            with self.lock:
                updates = self.ui_update_queue
                self.ui_update_queue = []

            for update in updates:
                try:
                    update()
                except Exception as e:
                    self.safe_log(f"UI更新错误: {e}\n", "error")

        self.after(50, self.process_ui_updates)

    def update_user_completed_status(self, username, completed=True):
        """线程安全更新任务完成状态，仅经验满时调用"""
        username = username.strip()

        def _update():
            with self.lock:
                for user in self.user_data_list:
                    if user["name"].strip() == username:
                        user["completed"] = completed
                        break
            self.update_single_user_row(username)

        if threading.current_thread() is threading.main_thread():
            _update()
        else:
            with self.lock:
                self.ui_update_queue.append(_update)

    def update_user_status(self, username, status):
        """线程安全更新账号状态"""
        username = username.strip()

        def _update():
            with self.lock:
                for user in self.user_data_list:
                    if user["name"].strip() == username:
                        user["status"] = status
                        break
            self.update_single_user_row(username)

        if threading.current_thread() is threading.main_thread():
            _update()
        else:
            with self.lock:
                self.ui_update_queue.append(_update)

    def update_user_today_exp(self, username, current_exp, total_exp):
        """线程安全更新今日经验，强转int"""
        username = username.strip()
        # 强制转为int，避免字符串比较
        current_exp = int(current_exp) if str(current_exp).isdigit() else 0
        total_exp = int(total_exp) if str(total_exp).isdigit() else 0

        def _update():
            with self.lock:
                for user in self.user_data_list:
                    if user["name"].strip() == username:
                        user["today_exp"] = (current_exp, total_exp)
                        break
            self.update_single_user_row(username)

        if threading.current_thread() is threading.main_thread():
            _update()
        else:
            with self.lock:
                self.ui_update_queue.append(_update)

    def add_target_exp_record(self, current_exp, total_exp):
        """插入目标玩家经验记录"""
        current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with self.lock:
            self.target_player_exp_list.append((current_time, current_exp, total_exp))
        self.safe_log(f"已将{self.target_player}经验 {current_exp}/{total_exp} 插入列表\n", tag="target_exp")

    def reset_all_status(self):
        """
        核心：每日凌晨2点重置所有状态
        1. 任务状态强制置为未完成（completed=False）
        2. 清空今日经验、好友数量
        3. 重置每日任务执行标记
        4. 清空目标玩家经验记录
        """
        with self.lock:
            for user in self.user_data_list:
                user["completed"] = False  # 关键：任务状态刷新为未完成
                user["today_exp"] = ""     # 清空今日经验
                user["friends_count"] = "" # 清空好友数量
                user["daily_task_done"] = False  # 重置每日任务标记
            self.target_player_exp_list.clear()  # 清空目标玩家经验记录
        # 强制刷新表格，UI实时同步为未完成
        self.refresh_user_table1()
        # 打印专属重置日志，方便查看
        self.safe_log("=== 每日凌晨2点重置完成：所有用户任务状态已刷新为【未完成】===\n", "reset")

    def setup_daily_reset(self):
        """
        配置每日凌晨2点自动重置
        循环调度：每次重置后，重新计算下一个2点的时间，永久执行
        """
        def calculate_next_reset_seconds():
            """计算距离下一个凌晨2点的秒数"""
            now = datetime.datetime.now()
            # 构造今日凌晨2点
            next_reset = now.replace(hour=2, minute=0, second=0, microsecond=0)
            # 如果当前时间已过2点，重置为明日2点
            if next_reset <= now:
                next_reset += timedelta(days=1)
            # 计算时间差（秒）
            return int((next_reset - now).total_seconds())

        def auto_reset():
            """执行重置，并重新调度下一次"""
            self.reset_all_status()
            # 重新计算下一个2点的延迟，继续调度
            next_delay = calculate_next_reset_seconds()
            self.after(next_delay * 1000, auto_reset)

        # 首次启动，计算延迟并调度
        initial_delay = calculate_next_reset_seconds()
        self.safe_log(f"=== 任务状态重置调度已启动，将在【{initial_delay//3600}小时{initial_delay%3600//60}分钟】后（凌晨2点）首次重置===\n", "reset")
        self.after(initial_delay * 1000, auto_reset)


# ------------------------------ 主逻辑函数 ------------------------------ #
def main(app):
    try:
        while app.running:
            # 复制用户数据，避免迭代中修改
            user_data_list_copy = []
            with app.lock:
                user_data_list_copy = list(app.user_data_list)

            if not user_data_list_copy:
                time.sleep(3)
                continue

            # 遍历处理每个用户
            for user_info in user_data_list_copy:
                if not app.running:
                    break

                # 基础信息获取与过滤
                name = user_info["name"].strip()
                daqu = user_info["daqu"].strip()
                ck = user_info["ck"].strip()
                level = user_info["level"].strip()
                user_info.setdefault("daily_task_done", False)

                # 过滤离线/等级1用户
                if user_info["status"] == "离线":
                    continue
                if level == "1":
                    app.update_user_status(name, "离线")
                    continue

                # 核心判断：仅经验满且完成，才跳过该用户
                exp_info = user_info["today_exp"]
                if isinstance(exp_info, tuple) and len(exp_info) == 2:
                    current_exp, total_exp = exp_info
                    # 强制int比较，确保判断准确
                    current_exp = int(current_exp) if str(current_exp).isdigit() else 0
                    total_exp = int(total_exp) if str(total_exp).isdigit() else 0
                    if current_exp == total_exp and user_info["completed"]:
                        continue  # 经验满+完成，跳过

                # 步骤1：执行每日任务（修改核心：仅任务未完成时执行）
                now = datetime.datetime.now()
                is_after_2am = now >= datetime.datetime(now.year, now.month, now.day, 2, 0, 0)
                # 新增：检查任务状态是否为未完成（completed=False）
                is_task_unfinished = user_info.get("completed", False) is False
                # 修改触发条件：未执行过每日任务 + 凌晨2点后 + 任务状态未完成
                if not user_info.get("daily_task_done", False) and is_after_2am and is_task_unfinished:
                    try:
                        process_daily_tasks(daqu, ck, name, app, thread_semaphore)
                        # 标记每日任务已执行，避免重复
                        with app.lock:
                            for u in app.user_data_list:
                                if u["name"].strip() == name:
                                    u["daily_task_done"] = True
                        app.safe_log(f"{name} 任务状态为未完成，执行每日任务完成\n", "success")
                    except Exception as e:
                        app.safe_log(f"{name} 执行每日任务错误：{e}\n", "error")
                        continue
                elif user_info.get("completed", False) is True:
                    # 任务已完成时打印日志提示
                    app.safe_log(f"{name} 任务状态为已完成，跳过每日任务执行\n", "info")

                # 步骤2：获取最新用户数据（含经验）
                user_data = retry_on_skip(pvzall.user_default, 3, app, name, daqu, ck, "0")
                if user_data == '跳过' or not isinstance(user_data, (list, tuple)):
                    app.safe_log(f"{name} 获取用户数据失败，跳过\n", "error")
                    continue

                # 步骤3：提取并更新等级/经验（强转int）
                level = user_data[13]
                current_exp = int(user_data[14]) if str(user_data[14]).isdigit() else 0
                total_exp = int(user_data[15]) if str(user_data[15]).isdigit() else 0
                app.safe_log(f"{name} 等级: {level} | 经验: {current_exp}/{total_exp}\n", "info")

                # 更新内存中的等级和经验
                with app.lock:
                    for u in app.user_data_list:
                        if u["name"].strip() == name:
                            if str(level).isdigit() and int(level) > 13:
                                u["level"] = str(level).strip()
                            u["today_exp"] = (current_exp, total_exp)
                app.update_single_user_row(name)

                # 步骤4：更新好友数量（仅一次）
                if "/" not in user_info.get("friends_count", "").strip():
                    try:
                        if isinstance(user_data, (list, tuple)) and len(user_data) >= 26:
                            friends_count = friends_data(user_data, daqu, ck)
                            if friends_count != "跳过" and friends_count.strip():
                                with app.lock:
                                    for u in app.user_data_list:
                                        if u["name"].strip() == name:
                                            u["friends_count"] = friends_count.strip()
                                app.update_single_user_row(name)
                                app.safe_log(f"{name} 好友数量: {friends_count}\n", "info")
                    except Exception as e:
                        app.safe_log(f"{name} 获取好友数量失败：{e}\n", "error")
                        pass



                # 步骤5：核心逻辑 - 经验未满，强制执行process_experience补全
                if current_exp < total_exp:
                    app.safe_log(f"{name} 经验未满，执行经验补全程序\n", "info")
                    experience_full = process_experience(daqu, ck, name, user_data, app, thread_semaphore)
                    # 经验补全后，重新获取数据更新
                    if experience_full:
                        new_user_data = retry_on_skip(pvzall.user_default, 2, app, name, daqu, ck, "0")
                        if new_user_data != '跳过' and isinstance(new_user_data, (list, tuple)):
                            new_current = int(new_user_data[14]) if str(new_user_data[14]).isdigit() else 0
                            new_total = int(new_user_data[15]) if str(new_user_data[15]).isdigit() else 0
                            app.update_user_today_exp(name, new_current, new_total)
                            app.safe_log(f"{name} 经验补全完成：{new_current}/{new_total}\n", "success")
                            # 唯一标记完成的时机：经验满
                            app.update_user_completed_status(name, True)
                    continue
                # 经验满，直接标记完成
                elif current_exp == total_exp and not user_info["completed"]:
                    app.update_user_completed_status(name, True)
                    app.safe_log(f"{name} 经验已满，标记任务为已完成\n", "success")

            # 循环延迟，减少CPU占用
            time.sleep(2)

    except Exception as e:
        app.safe_log(f"主循环执行异常：{e}\n", "error")
    finally:
        app.running = False
        app.after(0, lambda: app.run_btn.config(state=tk.NORMAL))
        app.safe_log("主进程已正常退出\n", "info")


# ------------------------------ 辅助函数 ------------------------------ #
def process_vip_operations(daqu, ck, name, user_data, app, semaphore):
    """处理VIP礼包购买及使用"""
    with semaphore:
        try:
            if int(user_data[5]) > 390:
                result = pvzall.user_shop(daqu, ck, 2476, 1)
                app.safe_log(f"{name} 购买VIP礼包: {result}\n", "info")

                if "跳过" not in str(result):
                    open_result = pvzall.user_openbox(daqu, ck, 529, 1, app)
                    if "跳过" not in str(open_result):
                        for item, count in [(498, 2), (500, 1)]:
                            use_result = pvzall.user_useOf(daqu, ck, item, count, app)
                            app.safe_log(f"{name} 使用{item}道具: {use_result}\n", "info")
                            time.sleep(0.1)
            else:
                return "跳过"
        except Exception as e:
            app.safe_log(f"{name} VIP操作失败：{e}\n", "error")
            return "跳过"


def process_experience(daqu, ck, name, user_data, app, semaphore):
    """处理经验获取逻辑，经验满返回True，否则False"""
    with semaphore:
        try:
            # 强制int转换，确保判断准确
            current_exp = int(user_data[14]) if str(user_data[14]).isdigit() else 0
            total_exp = int(user_data[15]) if str(user_data[15]).isdigit() else 0

            # 经验已满，直接返回True
            if current_exp == total_exp:
                app.update_user_today_exp(name, current_exp, total_exp)
                if name.strip() == app.target_player.strip():
                    try:
                        app.add_target_exp_record(current_exp, total_exp)
                    except (ValueError, TypeError) as e:
                        app.safe_log(f"{name} 插入经验记录失败：{e}\n", "error")
                return True

            # 经验未满，执行获取逻辑
            now = datetime.datetime.now()
            timestamp = int(now.timestamp())
            is_vip = int(user_data[9]) > timestamp if str(user_data[9]).isdigit() else False
            after_2am = now >= datetime.datetime(now.year, now.month, now.day, 2, 0, 0)

            if is_vip:
                if not after_2am:
                    return False

                auto_rewards = pvzall.user_vip_autoRewards(daqu, ck, app)
                if auto_rewards == "跳过":
                    app.safe_log(f"{name} VIP自动领奖失败，跳过\n", "error")
                    return False

                # 领奖后重新获取数据
                new_user_data = retry_on_skip(pvzall.user_default, 2, app, name, daqu, ck, "0")
                if new_user_data == '跳过':
                    app.safe_log(f"{name} VIP领奖后获取新数据失败\n", "error")
                    return False

                if isinstance(new_user_data, (list, tuple)) and len(new_user_data) >= 16:
                    new_current = int(new_user_data[14]) if str(new_user_data[14]).isdigit() else 0
                    new_total = int(new_user_data[15]) if str(new_user_data[15]).isdigit() else 0
                    app.update_user_today_exp(name, new_current, new_total)
                    if name.strip() == app.target_player.strip():
                        try:
                            app.add_target_exp_record(new_current, new_total)
                        except (ValueError, TypeError) as e:
                            app.safe_log(f"{name} 插入目标经验记录失败：{e}\n", "error")
                    # 领奖后判断是否满经验
                    return new_current == new_total
            else:
                # 普通用户执行花园经验获取
                user_data = pvzall.get_Garden_experience(daqu, ck, name, app, user_data)

                if isinstance(user_data, (list, tuple)) and len(user_data) >= 16:
                    new_current = int(user_data[14]) if str(user_data[14]).isdigit() else 0
                    new_total = int(user_data[15]) if str(user_data[15]).isdigit() else 0
                    app.update_user_today_exp(name, new_current, new_total)
                    if name.strip() == app.target_player.strip():
                        try:
                            app.add_target_exp_record(new_current, new_total)
                        except (ValueError, TypeError) as e:
                            app.safe_log(f"{name} 插入目标经验记录失败：{e}\n", "error")
                    # 花园操作后判断是否满经验
                    return new_current == new_total

            time.sleep(0.2)
            return False
        except Exception as e:
            app.safe_log(f"{name} 处理经验失败：{e}\n", "error")
            return False


def process_daily_tasks(daqu, ck, name, app, semaphore):
    """执行每日任务集合，仅任务未完成时执行"""
    with semaphore:
        # 二次校验：确保任务状态为未完成（防止多线程下状态变更）
        with app.lock:
            user_info = next((u for u in app.user_data_list if u["name"].strip() == name), None)
            if not user_info or user_info.get("completed", True) is True:
                app.safe_log(f"{name} 任务状态为已完成，终止执行每日任务\n", "info")
                return

        try:
            # 更新品刷数量
            try:
                item_count = update_item_count(daqu, ck)
                with app.lock:
                    user_info = next((u for u in app.user_data_list if u["name"].strip() == name), None)
                    if user_info:
                        user_info["item_count"] = item_count
                app.safe_log(f"{name} 品刷数量：{item_count}\n", "info")
                # 更新表格显示
                app.update_single_user_row(name)
            except Exception as e:
                app.safe_log(f"{name} 获取品刷数量失败：{e}\n", "error")

            now = datetime.datetime.now()
            if now > datetime.datetime(now.year, now.month, now.day, 2, 0, 0):
                user_data = pvzall.user_default(daqu, ck, "1")

                process_vip_operations(daqu,ck,name,user_data,app,semaphore)
                # 每日任务列表（你指定的操作）
                tasks = [
                    (pvzall.tree_addheight, "大树浇水"),
                    (pvzall.gift_certificate_shop, "购买礼券商品"),
                    (pvzall.body_get_reward, "领取任务奖励"),
                    (pvzall.body_get_game_instance, "领取副本奖励"),
                    (pvzall.every_day_active_sign, "每日签到"),
                    (pvzall.every_day_serverbattle, "跨服战"),
                    (pvzall.user_getMedal, "打副本勋章")
                ]

                for func, task_name in tasks:
                    if not app.running:
                        break

                    # 根据函数签名传参
                    sig = inspect.signature(func)
                    params = list(sig.parameters.keys())
                    try:
                        if "name" in params:
                            result = func(daqu, ck, name, app)
                        else:
                            result = func(daqu, ck, app)

                        if task_name == "打副本勋章" and "副本挑战书不足" in str(result):
                            app.safe_log(f"{name}{task_name}：副本挑战书不足，跳过\n", "info")
                            continue

                        if task_name == "大树浇水" and "今日大树高度提升已达上限" in str(result):
                            app.safe_log(f"{name}{task_name}：已达上限，跳过后续任务\n", "info")
                            break

                        app.safe_log(f"{name}{task_name}执行完成\n", "success")
                        time.sleep(0.1)
                    except Exception as e:
                        app.safe_log(f"{name}{task_name}执行失败：{e}\n", "error")
                        continue
        except Exception as e:
            app.safe_log(f"{name} 处理每日任务失败：{e}\n", "error")
            pass


# ------------------------------ 工具函数 ------------------------------ #
def retry_on_skip(func, max_retries, app, name=None, *args):
    """对返回“跳过”的函数重试，增加延迟控制"""
    name = name.strip() if name else None
    for attempt in range(max_retries):
        try:
            result = func(*args)

            if (result == '跳过' or
                    not isinstance(result, (str, list, tuple)) or
                    (isinstance(result, str) and len(result.strip()) == 0)):
                time.sleep(0.5 * (attempt + 1))
                continue

            # 处理异地登录
            if isinstance(result, str) and "此账号在其他地方登录" in result and name:
                app.update_user_status(name, "离线")
                return '跳过'

            return result

        except Exception as e:
            if name:
                app.safe_log(f"{name} 重试第{attempt+1}次失败：{e}\n", "error")
            time.sleep(0.5)
            continue
    return '跳过'


# ------------------------------ 植物技能窗口 ------------------------------ #
class PlantInfoWindow:
    """植物信息窗口 - 用于学习技能"""
    def __init__(self, plant_id, plant_name, plant_level, ck, daqu, add_log_func):
        self.plant_id = plant_id
        self.plant_name = plant_name
        self.plant_level = plant_level
        self.ck = ck
        self.daqu = daqu
        self.add_log = add_log_func
        self.skill_book = []  # 存储技能书籍 [工具ID, 数量]
        
        # 创建窗口
        self.root = tk.Toplevel()
        self.root.title("植物信息")
        self.root.geometry("400x120")
        self.root.resizable(False, False)
        
        self.setup_ui()
        
    def setup_ui(self):
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # 水平布局：标签 + 下拉框 + 按钮
        horizontal_frame = ttk.Frame(main_frame)
        horizontal_frame.pack(fill=tk.X, expand=True)
        
        # 标签
        self.label = ttk.Label(horizontal_frame, text="选择需要学习的技能:")
        self.label.pack(side=tk.LEFT, padx=5)
        
        # 获取用户仓库信息，筛选技能书籍
        self.load_skill_books()
        
        # 创建下拉框，显示仓库技能书
        self.skill_combo = ttk.Combobox(horizontal_frame, state="readonly", width=10)
        if self.skill_book:
            skill_names = [pvzall.Tool_name(book[0]) for book in self.skill_book]
            self.skill_combo["values"] = skill_names
        else:
            self.skill_combo["values"] = ["暂无技能书籍"]
            self.skill_combo.current(0)
        self.skill_combo.pack(side=tk.LEFT, padx=5)
        
        # 创建确认按钮
        self.confirm_button = ttk.Button(horizontal_frame, text="确认学习", command=self.confirm_learn_skill)
        self.confirm_button.pack(side=tk.LEFT, padx=5)
        
        # 居中显示
        self.root.transient()
        self.root.grab_set()
        
    def load_skill_books(self):
        """从仓库获取技能书籍"""
        try:
            Warehouse_Data = pvzall.Analyze_Warehouse_Data(self.daqu, self.ck, "tool", "1")
            if Warehouse_Data:
                for item in Warehouse_Data:
                    if len(item) >= 2:
                        tool_name = pvzall.Tool_name(item[0])
                        if "书籍" in tool_name:
                            self.skill_book.append([item[0], item[1]])
        except Exception as e:
            self.add_log(f"加载技能书籍失败: {e}")
    
    def confirm_learn_skill(self):
        """确认学习技能"""
        selected_skill = self.skill_combo.get()
        if not selected_skill or selected_skill == "暂无技能书籍":
            messagebox.showwarning("警告", "请选择一个技能书籍！")
            return
        
        # 获取选中技能的ID
        selected_skill_id = None
        for book in self.skill_book:
            if selected_skill == pvzall.Tool_name(book[0]):
                selected_skill_id = book[0]
                break
        
        if selected_skill_id is None:
            messagebox.showwarning("警告", "未找到选中的技能书籍！")
            return
        
        # 调用学习技能接口
        try:
            return_data = pvzall.user_learn_skill(self.daqu, self.ck, selected_skill_id, self.plant_id)
            
            if return_data == "success":
                messagebox.showinfo("技能学习", f"已学习技能: {selected_skill}")
                self.add_log(f"{self.plant_name}({self.plant_id}) 学习技能 {selected_skill} 成功")
                self.root.destroy()
            elif return_data == "生物已经拥有该技能":
                messagebox.showwarning("技能学习", f"该植物已经拥有技能: {selected_skill}")
            elif return_data == "已学习了一种主动技能":
                messagebox.showwarning("技能学习", "该植物已学习了一种主动技能，请先将该技能遗忘后再学习")
            elif return_data == "生物拥有的技能已满":
                messagebox.showwarning("技能学习", "该植物拥有的技能已满，请先将技能遗忘后再学习")
            else:
                messagebox.showwarning("技能学习", f"学习技能失败: {return_data}")
        except Exception as e:
            self.add_log(f"学习技能失败: {e}")
            messagebox.showerror("错误", f"学习技能失败: {e}")


class ForgetSkillWindow:
    """遗忘技能窗口"""
    def __init__(self, plant_name, plant_data, ck, daqu, log_text):
        self.plant_name = plant_name
        self.skills = plant_data[0]
        self.plant_id = plant_data[1]
        self.ck = ck
        self.daqu = daqu
        self.log_text = log_text
        
        # 创建窗口
        self.root = tk.Toplevel()
        self.root.title(f"{plant_name} - 遗忘技能")  # 窗口标题为选中植物的名字
        self.root.geometry("400x120")
        self.root.resizable(False, False)
        
        self.setup_ui()
        
    def setup_ui(self):
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # 水平布局：标签 + 下拉框 + 按钮
        horizontal_frame = ttk.Frame(main_frame)
        horizontal_frame.pack(fill=tk.X, expand=True)
        
        # 创建标签
        self.label = ttk.Label(horizontal_frame, text="选择需要遗忘的技能:")
        self.label.pack(side=tk.LEFT, padx=5)
        
        # 创建下拉框，显示植物的技能
        self.skill_combo = ttk.Combobox(horizontal_frame, state="readonly", width=10)
        if self.skills and isinstance(self.skills, list):
            skill_names = [f"{skill[1]}({skill[2]})" for skill in self.skills]
            self.skill_combo["values"] = skill_names
        else:
            self.skill_combo["values"] = ["暂无技能"]
            self.skill_combo.current(0)
        self.skill_combo.pack(side=tk.LEFT, padx=5)
        
        # 创建确认按钮
        self.confirm_button = ttk.Button(horizontal_frame, text="确认遗忘", command=self.confirm_forget_skill)
        self.confirm_button.pack(side=tk.LEFT, padx=5)
        
        # 居中显示
        self.root.transient()
        self.root.grab_set()
        
    def confirm_forget_skill(self):
        """确认遗忘技能"""
        selected_skill = self.skill_combo.get()
        if not selected_skill or selected_skill == "暂无技能":
            messagebox.showwarning("警告", "请选择一个要遗忘的技能！")
            return
        
        # 获取选中技能的ID
        selected_skill_id = None
        if isinstance(self.skills, list):
            for skill in self.skills:
                if selected_skill == f"{skill[1]}({skill[2]})":
                    selected_skill_id = skill[0]
                    break
        
        if selected_skill_id is None:
            messagebox.showwarning("警告", "未找到选中的技能！")
            return
        
        # 调用遗忘技能接口
        print(f"遗忘技能id: {selected_skill_id} 植物ID: {self.plant_id}")
        try:
            return_data = pvzall.user_forget_skill(self.daqu, self.ck, selected_skill_id, self.plant_id)
            if return_data == "success":
                messagebox.showinfo("技能遗忘", f"已遗忘技能: {selected_skill}")
                self.log_text.config(state=tk.NORMAL)
                self.log_text.insert(tk.END, f"{self.plant_name}({self.plant_id}) 遗忘技能 {selected_skill} 成功\n")
                self.log_text.see(tk.END)
                self.log_text.config(state=tk.DISABLED)
            else:
                messagebox.showwarning("技能遗忘", f"遗忘技能失败: {return_data}")
        except Exception as e:
            self.log_text.config(state=tk.NORMAL)
            self.log_text.insert(tk.END, f"遗忘技能失败: {e}\n")
            self.log_text.see(tk.END)
            self.log_text.config(state=tk.DISABLED)
            messagebox.showerror("错误", f"遗忘技能失败: {e}")
        
        self.root.destroy()  # 关闭窗口


class UpgradeSkillWindow:
    """升级技能窗口"""
    def __init__(self, plant_name, plant_data, ck, daqu, log_text):
        self.plant_name = plant_name
        self.skills = plant_data[0]
        self.plant_id = plant_data[1]
        self.ck = ck
        self.daqu = daqu
        self.log_text = log_text
        
        # 创建窗口
        self.root = tk.Toplevel()
        self.root.title(f"{plant_name} - 升级技能")
        self.root.geometry("400x120")
        self.root.resizable(False, False)
        
        self.setup_ui()
        
    def setup_ui(self):
        main_frame = ttk.Frame(self.root, padding=20)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # 水平布局：标签 + 下拉框 + 按钮
        horizontal_frame = ttk.Frame(main_frame)
        horizontal_frame.pack(fill=tk.X, expand=True)
        
        # 创建标签
        self.label = ttk.Label(horizontal_frame, text="需要升级的技能:")
        self.label.pack(side=tk.LEFT, padx=5)
        
        # 创建下拉框，显示植物的所有技能
        self.skill_combo = ttk.Combobox(horizontal_frame, state="readonly", width=10)
        if self.skills and isinstance(self.skills, list):
            skill_names = [f"{skill[1]}({skill[2]})" for skill in self.skills]
            self.skill_combo["values"] = skill_names
        else:
            self.skill_combo["values"] = ["暂无技能"]
            self.skill_combo.current(0)
        self.skill_combo.pack(side=tk.LEFT, padx=5)
        
        # 创建开始升级按钮
        self.upgrade_button = ttk.Button(horizontal_frame, text="开始升级", command=self.start_upgrade)
        self.upgrade_button.pack(side=tk.LEFT, padx=5)
        
        # 居中显示
        self.root.transient()
        self.root.grab_set()
        
    def start_upgrade(self):
        """开始升级技能"""
        selected_skill = self.skill_combo.get()
        if not selected_skill or selected_skill == "暂无技能":
            messagebox.showwarning("错误", "请选择一个技能！")
            return
        
        selected_skill_id = None
        if isinstance(self.skills, list):
            for skill in self.skills:
                if selected_skill == f"{skill[1]}({skill[2]})":
                    selected_skill_id = skill[0]
                    break
        
        if selected_skill_id is None:
            messagebox.showwarning("错误", "未找到选择的技能！")
            return
        
        # 禁用按钮，防止重复点击
        self.upgrade_button.config(state=tk.DISABLED)
        
        # 创建并启动线程
        self.upgrade_thread = UpgradeSkillThread(self.daqu, self.ck, self.plant_id, selected_skill_id, self.log_text)
        self.upgrade_thread.callback = self.on_upgrade_finished
        self.upgrade_thread.error_callback = self.on_upgrade_error
        self.upgrade_thread.start()
        
    def on_upgrade_finished(self, message):
        """升级完成的回调函数"""
        messagebox.showinfo("成功", message)
        self.upgrade_button.config(state=tk.NORMAL)
        self.root.destroy()
        
    def on_upgrade_error(self, message):
        """升级失败的回调函数"""
        messagebox.showwarning("失败", message)
        self.upgrade_button.config(state=tk.NORMAL)


# ------------------------------ 升级技能线程 ------------------------------ #
import threading

class UpgradeSkillThread(threading.Thread):
    """升级技能线程"""
    def __init__(self, daqu, ck, plant_id, skill_id, log_text):
        super().__init__()
        self.daqu = daqu
        self.ck = ck
        self.plant_id = plant_id
        self.skill_id = skill_id
        self.log_text = log_text
        self.callback = None
        self.error_callback = None
        
    def run(self):
        """线程执行函数"""
        try:
            # 调用升级技能接口
            return_data = pvzall.user_upgrade_skill(self.daqu, self.ck, self.skill_id, self.plant_id)
            
            if return_data == "success":
                # 更新日志
                self.log_text.config(state=tk.NORMAL)
                self.log_text.insert(tk.END, f"技能升级成功\n")
                self.log_text.see(tk.END)
                self.log_text.config(state=tk.DISABLED)
                
                if self.callback:
                    # 使用after方法在主线程中执行回调
                    self.log_text.after(0, self.callback, "技能升级成功")
            else:
                if self.error_callback:
                    self.log_text.after(0, self.error_callback, return_data)
        except Exception as e:
            error_msg = f"升级技能失败: {e}"
            self.log_text.config(state=tk.NORMAL)
            self.log_text.insert(tk.END, f"{error_msg}\n")
            self.log_text.see(tk.END)
            self.log_text.config(state=tk.DISABLED)
            
            if self.error_callback:
                self.log_text.after(0, self.error_callback, error_msg)


# ------------------------------ 程序入口 ------------------------------ #
if __name__ == "__main__":
    import traceback
    
    # 配置pvzall模块日志
    pvzall.if_ui = "tk"
    pvzall.logger = None

    # 自定义pr函数，**去掉重复时间戳**，日志更整洁
    def custom_pr(print_str, log_signal):
        if log_signal == "1":
            print(print_str)
        else:
            if pvzall.if_ui == "tk" and pvzall.logger:
                pvzall.logger.safe_log(print_str)
            else:
                try:
                    log_signal.emit(print_str)
                except:
                    pass

    # 替换pvzall的pr函数
    pvzall.pr = custom_pr

    # 创建app实例
    try:
        app = Application()
        pvzall.logger = app

        # 捕获主线程异常，避免崩溃
        try:
            app.mainloop()
        except Exception as e:
            print(f"主线程运行异常：{e}")
            print(traceback.format_exc())
    except Exception as e:
        print(f"初始化失败：{e}")
        print(traceback.format_exc())
        # 如果初始化失败，创建一个简单的错误窗口
        try:
            import tkinter as tk
            error_root = tk.Tk()
            error_root.title("启动失败")
            error_root.geometry("400x200")
            tk.Label(error_root, text=f"启动失败: {e}", wraplength=380).pack(pady=20)
            error_root.mainloop()
        except:
            pass
