import base64
import os

from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_PR_Key_Ring(object):
    PR_key=""
    def setupUi(self, PR_Key_Ring):
        self.Ui_PR_Key_Ring = PR_Key_Ring
        PR_Key_Ring.setObjectName("PR_Key_Ring")
        PR_Key_Ring.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(PR_Key_Ring)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(40, 50, 711, 501))
        self.label.setStyleSheet("background-color: rgb(234, 234, 234);\n"
"")
        self.label.setText("")
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(310, 70, 151, 41))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")

        # GENERALNA PODESAVANJA TABELE
        self.tableWidget = QtWidgets.QTableWidget(self.centralwidget)
        self.tableWidget.setGeometry(QtCore.QRect(200, 120, 391, 241))
        self.tableWidget.setStyleSheet("background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(144,179,255,255), stop:1 rgba(29,44,132,155));\n"
"\n"
"border-radius:10px;")
        self.tableWidget.setObjectName("tableWidget")


        self.tableWidget.setColumnCount(4)
        self.tableWidget.setRowCount(0)

        # PODESAVANJE ITEMA TABELE
        item = QtWidgets.QTableWidgetItem()
        item.setText("Key ID")
        self.tableWidget.setHorizontalHeaderItem(0, item)

        item = QtWidgets.QTableWidgetItem()
        item.setText("Public Key")
        self.tableWidget.setHorizontalHeaderItem(1, item)

        item = QtWidgets.QTableWidgetItem()
        item.setText("Private Key")
        self.tableWidget.setHorizontalHeaderItem(2, item)

        item = QtWidgets.QTableWidgetItem()
        item.setText("User ID")
        self.tableWidget.setHorizontalHeaderItem(3, item)

        # POMOCNA LABELA ZA ISPIS SELKTOVANIH KLJCUEVA
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(190, 400, 401, 111))
        self.label_3.setStyleSheet("background-color: rgba(140,179,255,255);\n"
"border-radius:10px;")
        self.label_3.setText("")
        self.label_3.setObjectName("label_3")
        PR_Key_Ring.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(PR_Key_Ring)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        PR_Key_Ring.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(PR_Key_Ring)
        self.statusbar.setObjectName("statusbar")
        PR_Key_Ring.setStatusBar(self.statusbar)

        # podesavanje broja redova i kolona nase tabele
        self.tableWidget.setColumnCount(4)
        self.tableWidget.setRowCount(0)

        #Ucitavanje iz fajlova
        self.checkLabelVisibility()
        self.tableWidget.cellClicked.connect(self.cell_was_clicked)
        self.loadProducts()

        self.retranslateUi(PR_Key_Ring)
        QtCore.QMetaObject.connectSlotsByName(PR_Key_Ring)

    def retranslateUi(self, PR_Key_Ring):
        _translate = QtCore.QCoreApplication.translate
        PR_Key_Ring.setWindowTitle(_translate("PR_Key_Ring", "MainWindow"))
        self.label_2.setText(_translate("PR_Key_Ring", "PRIVATE KEY RING"))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("PR_Key_Ring", "Key ID"))
        item = self.tableWidget.horizontalHeaderItem(1)
        item.setText(_translate("PR_Key_Ring", "Public Key"))
        item = self.tableWidget.horizontalHeaderItem(2)
        item.setText(_translate("PR_Key_Ring", "Private Key"))
        item = self.tableWidget.horizontalHeaderItem(3)
        item.setText(_translate("PR_Key_Ring", "User ID"))


    def checkLabelVisibility(self):
        # Provera teksta u labeli 3
        if self.label_3.text().strip() == "":
            self.label_3.setVisible(False)
        else:
            self.label_3.setVisible(True)

    def loadProducts(self):
        directory = "private_keys"
        files = os.listdir(directory)
        files_txt = [f for f in files if os.path.isfile(os.path.join(directory, f)) and f.endswith('.txt')]
        self.private_key_ring = []

        i = 0
        for file in files_txt:
            filepath = 'private_keys/' + file
            with open(filepath, 'r') as f:
                for line in f:
                    line = [e for e in line.split(' admin ')]
                    name_without_extension = file.split('.')[0]
                    line[1] = name_without_extension + ".pem"
                    line[2] = name_without_extension+".pem"
                    self.private_key_ring.append(line)
                i += 1
            f.close()

        row_cnt = i
        col_cnt = 4
        self.tableWidget.setRowCount(row_cnt)
        i = 0
        for i in range(0, row_cnt):
            for j in range(col_cnt):
                item = self.private_key_ring[i][j]
                self.tableWidget.setItem(i, j, QtWidgets.QTableWidgetItem(item))
                self.tableWidget.resizeRowsToContents()
                self.tableWidget.resizeColumnsToContents()

    def update_label(self,text):
        self.label_3.setText(text)
        self.label_3.adjustSize()


    def open_pass_auth_window(self, key_id_arg):
        from PasswordAuth import Ui_password_auth_window
        self.pass_auth_window = QtWidgets.QMainWindow()
        self.ui = Ui_password_auth_window()
        self.ui.setupUi(self.pass_auth_window, key_id_arg,self.Ui_PR_Key_Ring)
        self.pass_auth_window.show()
        self.Ui_PR_Key_Ring.hide()

    def cell_was_clicked(self, row, column):
        cell = self.tableWidget.item(row, column)
        if (column == 2):#privatni kljuc
            cell0 = self.tableWidget.item(row, 0)
            key_id_str = cell0.text()
            cell_contents = cell.text()
            self.open_pass_auth_window(int(key_id_str))

            #svakako za prikaz
            cell0 = self.tableWidget.item(row, 1)
            text = cell0.text()
            filepath = 'private_keys/' + str(text)
            with open(filepath, 'rb') as f:
                pem_pr_key = f.read()
                print(pem_pr_key.decode('utf-8'))
                self.label_3.setVisible(True)
                self.label_3.setText(pem_pr_key.decode('utf-8'))
                self.label_3.adjustSize()
            # DIREKETORIJUM ZA PRIVATE
            if not os.path.exists("exported_private_keys"):
                os.makedirs("exported_private_keys")

            file_path = os.path.join("exported_private_keys/", text)
            # upis privatnog kljuca u .pem formatu
            with open(file_path, 'wb') as f:
                f.write(pem_pr_key)

        elif(column==1):#public kljuc
            text = cell.text()
            filepath = 'public_keys/' + str(text)
            with open(filepath, 'rb') as f:
                pem_pu_key = f.read()
                print(pem_pu_key.decode('utf-8'))
                self.label_3.setVisible(True)
                self.label_3.setText(pem_pu_key.decode('utf-8'))
                self.label_3.adjustSize()

            # DIREKETORIJUM ZA PUBLIC
            if not os.path.exists("exported_public_keys"):
                os.makedirs("exported_public_keys")

            file_path = os.path.join("exported_public_keys/",  text)
            # upis javnog kljuca u .pem formatu
            with open(file_path, 'wb') as f:
                f.write(pem_pu_key)


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    PR_Key_Ring = QtWidgets.QMainWindow()
    ui = Ui_PR_Key_Ring()
    ui.setupUi(PR_Key_Ring)
    PR_Key_Ring.show()
    sys.exit(app.exec_())
