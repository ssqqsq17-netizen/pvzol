# -*- coding: utf-8 -*-

def log_message(log_content, log_signal):
    """日志记录函数"""
    print(log_content)
    if log_signal is not None:
        try:
            log_signal.emit(log_content)
        except:
            pass
