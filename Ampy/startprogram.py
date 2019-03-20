import sys
args = sys.argv

if True:
    from libs import pyboard
    board = pyboard.Pyboard("COM7")
    board.enter_raw_repl()
    #board.exec('import main')
    board.exec('import machine')
    board.exec('machine.reset()')
    board.exit_raw_repl()