from PyQt5 import QtCore, QtGui, QtWidgets
import  sys,resMain
from formKey import Ui_Form
from tabela import Ui_TabelaWindow
from tabela2 import Ui_PR_Key_Ring


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        self.Ui_MainWindow=MainWindow

        self.main_window = MainWindow
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(381, 574)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(10, 20, 351, 491))
        self.label.setStyleSheet("border-image: url(:/images/key.jpg);\n"
"border-radius:20px;")
        self.label.setText("")
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(10, 20, 361, 491))
        self.label_2.setStyleSheet("background-color: qlineargradient(spread:pad, x1:5, y1:5, x2:2, y2:1.715909, stop:0.375 rgba(200, 200, 200, 200), stop:0.8675 rgba(200,200, 200, 150));\n"
"border-radius:20px;")
        self.label_2.setText("")
        self.label_2.setObjectName("label_2")
        self.label_5 = QtWidgets.QLabel(self.centralwidget)
        self.label_5.setGeometry(QtCore.QRect(10, 20, 361, 491))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.label_5.setFont(font)
        self.label_5.setStyleSheet("background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(20,47,78,219), stop:1 rgba(85,98,112,226));\n"
"\n"
"border-radius:20px;")
        self.label_5.setText("")
        self.label_5.setObjectName("label_5")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(160, 40, 61, 21))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        font.setPointSize(15)
        font.setBold(True)
        font.setWeight(75)
        self.label_3.setFont(font)
        self.label_3.setStyleSheet("color: rgb(203, 203, 203);")
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(self.centralwidget)
        self.label_4.setGeometry(QtCore.QRect(20, 100, 351, 21))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.label_4.setFont(font)
        self.label_4.setStyleSheet("color: rgb(203, 203, 203);\n"
"background-color:rgb(0,0,0,30);")
        self.label_4.setObjectName("label_4")
        self.label_6 = QtWidgets.QLabel(self.centralwidget)
        self.label_6.setGeometry(QtCore.QRect(10, 190, 361, 21))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.label_6.setFont(font)
        self.label_6.setStyleSheet("color: rgb(203, 203, 203);\n"
"background-color:rgb(0,0,0,30);")
        self.label_6.setObjectName("label_6")
        self.generate_btn = QtWidgets.QPushButton(self.centralwidget)
        self.generate_btn.setGeometry(QtCore.QRect(70, 140, 93, 28))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.generate_btn.setFont(font)
        self.generate_btn.setObjectName("generate_btn")
        self.delete_btn = QtWidgets.QPushButton(self.centralwidget)
        self.delete_btn.setGeometry(QtCore.QRect(220, 140, 93, 28))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.delete_btn.setFont(font)
        self.delete_btn.setObjectName("delete_btn")

        # SLANJE PORUKE DUGME
        self.send_btn = QtWidgets.QPushButton(self.centralwidget)
        self.send_btn.setGeometry(QtCore.QRect(50, 230, 131, 28))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.send_btn.setFont(font)
        self.send_btn.setObjectName("send_btn")


        self.receive_btn = QtWidgets.QPushButton(self.centralwidget)
        self.receive_btn.setGeometry(QtCore.QRect(210, 230, 131, 28))
        font = QtGui.QFont()
        font.setFamily("MV Boli")
        self.receive_btn.setFont(font)
        self.receive_btn.setObjectName("public_ring")
        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 381, 26))
        self.menubar.setObjectName("menubar")
        self.menuKey_rings = QtWidgets.QMenu(self.menubar)
        self.menuKey_rings.setObjectName("menuKey_rings")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)
        self.actionPrivate_key_ring = QtWidgets.QAction(MainWindow)
        self.actionPrivate_key_ring.setObjectName("actionPrivate_key_ring")
        self.actionPublic_Key_ring = QtWidgets.QAction(MainWindow)
        self.actionPublic_Key_ring.setObjectName("actionPublic_Key_ring")
        self.menuKey_rings.addAction(self.actionPrivate_key_ring)
        self.menuKey_rings.addAction(self.actionPublic_Key_ring)
        self.menubar.addAction(self.menuKey_rings.menuAction())

        # povezivanje dugmica sa funkcijama
        self.generate_btn.clicked.connect(self.openWindow)
        self.delete_btn.clicked.connect(self.openDeleteWindow)
        self.send_btn.clicked.connect(self.open_send_msg_window)
        self.receive_btn.clicked.connect(self.open_receive_msg_window)


        #povezivanje akcija sa tabovima
        self.actionPublic_Key_ring.triggered.connect(lambda: self.openTabs(0))
        self.actionPrivate_key_ring.triggered.connect(lambda: self.openTabs(1))

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.label_3.setText(_translate("MainWindow", "PGP"))
        self.label_4.setText(_translate("MainWindow", "Key operations"))
        self.label_6.setText(_translate("MainWindow", "Key rings"))
        self.generate_btn.setText(_translate("MainWindow", "Generate pair"))
        self.delete_btn.setText(_translate("MainWindow", "Delete pair"))
        self.send_btn.setText(_translate("MainWindow", "Send Message"))
        self.receive_btn.setText(_translate("MainWindow", "Receive Message"))
        self.menuKey_rings.setTitle(_translate("MainWindow", "Key rings"))
        self.actionPrivate_key_ring.setText(_translate("MainWindow", "Private key ring"))
        self.actionPublic_Key_ring.setText(_translate("MainWindow", "Public Key ring"))

    # PRELAZAK NA PROZOR ZA SLANJE PORUKE
    def open_send_msg_window(self):
        from SendMessage import Ui_send_message_window
        self.send_msg_window = QtWidgets.QMainWindow()
        self.ui = Ui_send_message_window()
        self.ui.setupUi(self.send_msg_window,parent=self.Ui_MainWindow)
        self.send_msg_window.show()

    def open_receive_msg_window(self):
        from ReceiveMessage import Ui_receive_message_window
        self.receive_msg_window = QtWidgets.QMainWindow()
        self.ui=Ui_receive_message_window()
        self.ui.setupUi(self.receive_msg_window)
        self.receive_msg_window.show()

    def openWindow(self,i=0):
        self.window = QtWidgets.QMainWindow()
        self.form_window = QtWidgets.QWidget()
        self.ui = Ui_Form()
        self.ui.setupUi(self.form_window,self.main_window)
        self.form_window.show()
        #widget.setCurrentIndex(widget.currentIndex()+1)

    def openDeleteWindow(self):
        from deletePair import Ui_deletePair
        self.window=QtWidgets.QMainWindow()
        self.delete_window = QtWidgets.QMainWindow()
        self.ui= Ui_deletePair()
        self.ui.setupUi(self.delete_window)
        self.delete_window.show()
    def openTabs(self,i=0):
        self.window = QtWidgets.QMainWindow()
        self.tab = QtWidgets.QMainWindow()
        if i==0:
            self.ui = Ui_TabelaWindow()
        if i==1:
            self.ui = Ui_PR_Key_Ring()
        self.ui.setupUi(self.window)
        self.window.show()



if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
