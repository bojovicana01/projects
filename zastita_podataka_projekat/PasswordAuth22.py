# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'PasswordAuth22.ui'
#
# Created by: PyQt5 UI code generator 5.15.9
#
# WARNING: Any manual changes made to this file will be lost when pyuic5 is
# run again.  Do not edit this file unless you know what you are doing.


from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_password_auth_window(object):
    def setupUi(self, password_auth_window):
        password_auth_window.setObjectName("password_auth_window")
        password_auth_window.resize(445, 242)
        self.centralwidget = QtWidgets.QWidget(password_auth_window)
        self.centralwidget.setObjectName("centralwidget")
        self.entered_password = QtWidgets.QLineEdit(self.centralwidget)
        self.entered_password.setGeometry(QtCore.QRect(30, 60, 281, 22))
        self.entered_password.setObjectName("entered_password")
        self.pass_auth_label = QtWidgets.QLabel(self.centralwidget)
        self.pass_auth_label.setGeometry(QtCore.QRect(30, 20, 191, 16))
        self.pass_auth_label.setObjectName("pass_auth_label")
        self.confir_password_btn = QtWidgets.QPushButton(self.centralwidget)
        self.confir_password_btn.setGeometry(QtCore.QRect(300, 107, 121, 61))
        self.confir_password_btn.setObjectName("confir_password_btn")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(50, 120, 201, 61))
        self.label.setStyleSheet("background-color: rgb(182, 182, 182);")
        self.label.setText("")
        self.label.setObjectName("label")
        password_auth_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(password_auth_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 445, 26))
        self.menubar.setObjectName("menubar")
        password_auth_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(password_auth_window)
        self.statusbar.setObjectName("statusbar")
        password_auth_window.setStatusBar(self.statusbar)

        self.retranslateUi(password_auth_window)
        QtCore.QMetaObject.connectSlotsByName(password_auth_window)

    def retranslateUi(self, password_auth_window):
        _translate = QtCore.QCoreApplication.translate
        password_auth_window.setWindowTitle(_translate("password_auth_window", "password_auth_window"))
        self.pass_auth_label.setText(_translate("password_auth_window", "Enter password: "))
        self.confir_password_btn.setText(_translate("password_auth_window", "Confirm"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    password_auth_window = QtWidgets.QMainWindow()
    ui = Ui_password_auth_window()
    ui.setupUi(password_auth_window)
    password_auth_window.show()
    sys.exit(app.exec_())
