import os

from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_TabelaWindow(object):
    def setupUi(self, TabelaWindow):

        # GENERALNA PODESAVANJA PROZORA
        TabelaWindow.setObjectName("TabelaWindow")
        TabelaWindow.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(TabelaWindow)
        self.centralwidget.setObjectName("centralwidget")

        #GENERALNA PODESAVANJA TABELE
        self.tableWidget = QtWidgets.QTableWidget(self.centralwidget)
        self.tableWidget.setGeometry(QtCore.QRect(200, 120, 280, 251))
        self.tableWidget.setStyleSheet(
            "background-color: qlineargradient(spread:pad,x1:0,y1:0.505682,x2:1,y2:0.477, stop:0 rgba(144,179,255,255), stop:1 rgba(29,44,132,155));\n"
            "\n"
            "border-radius:10px;")
        self.tableWidget.setObjectName("tableWidget")

        self.tableWidget.setColumnCount(3)
        self.tableWidget.setRowCount(0)

        # PODESAVANJA POLJA TABELE
        item = QtWidgets.QTableWidgetItem()
        item.setText("Username")
        self.tableWidget.setHorizontalHeaderItem(0, item)

        item = QtWidgets.QTableWidgetItem()
        item.setText("User ID")
        self.tableWidget.setHorizontalHeaderItem(1, item)

        item = QtWidgets.QTableWidgetItem()
        item.setText("Public Key")
        self.tableWidget.setHorizontalHeaderItem(2, item)

        # Promena velicine misem
        #self.tableWidget.horizontalHeader().setSectionResizeMode(QtWidgets.QHeaderView.Interactive)

        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(90, 30, 681, 531))
        self.label.setStyleSheet("background-color: rgb(234, 234, 234);")
        self.label.setText("")
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(self.centralwidget)
        self.label_2.setGeometry(QtCore.QRect(320, 80, 151, 21))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.label_2.setFont(font)
        self.label_2.setObjectName("label_2")
        self.label_3 = QtWidgets.QLabel(self.centralwidget)
        self.label_3.setGeometry(QtCore.QRect(120, 420, 551, 111))
        self.label_3.setStyleSheet(
            "background-color: rgba(140,179,255,255);\n"
            "border-radius:10px;")
        self.label_3.setObjectName("label_3")
        self.label.raise_()
        self.tableWidget.raise_()
        self.label_2.raise_()
        self.label_3.raise_()

        # DODATNA PODESAVANJA PROZORA
        TabelaWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(TabelaWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        TabelaWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(TabelaWindow)
        self.statusbar.setObjectName("statusbar")
        TabelaWindow.setStatusBar(self.statusbar)

        #ucitaj iz fajlova
        self.checkLabelVisibility()
        self.tableWidget.cellClicked.connect(self.cell_was_clicked)
        self.loadProducts()

        self.retranslateUi(TabelaWindow)
        QtCore.QMetaObject.connectSlotsByName(TabelaWindow)

    def retranslateUi(self, TabelaWindow):
        _translate = QtCore.QCoreApplication.translate
        TabelaWindow.setWindowTitle(_translate("TabelaWindow", "MainWindow"))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("TabelaWindow", "Username"))
        item = self.tableWidget.horizontalHeaderItem(1)
        item.setText(_translate("TabelaWindow", "User ID"))
        item = self.tableWidget.horizontalHeaderItem(2)
        item.setText(_translate("TabelaWindow", "Public Key"))
        self.label_2.setText(_translate("TabelaWindow", "PUBLIC KEY RING"))

    def checkLabelVisibility(self):
        # Provera teksta u labeli 3
        if self.label_3.text().strip() == "":
            self.label_3.setVisible(False)
        else:
            self.label_3.setVisible(True)
    def loadProducts(self):
        directory = "public_keys"
        files = os.listdir(directory)
        files_txt=[f for f in files if os.path.isfile(os.path.join(directory,f) ) and f.endswith('.txt')]
        self.public_key_ring=[]

        i=0
        for file in files_txt:
            filepath = 'public_keys/' + file
            with open(filepath,'r') as f:
                for line in f:
                    line=[e for e in line.split()]
                    self.public_key_ring.append(line)
                i+=1
            f.close()

        row_cnt=i
        col_cnt=3
        self.tableWidget.setRowCount(row_cnt)
        i=0
        for i in range(0,row_cnt):
            for j in range(col_cnt):
                item = self.public_key_ring[i][j]
                self.tableWidget.setItem(i,j,QtWidgets.QTableWidgetItem(item))
                self.tableWidget.resizeRowsToContents()
                self.tableWidget.resizeColumnsToContents()

            file_name = self.tableWidget.item(i, 2)
            p = file_name.text()


            # Postavite se da se redovi automatski prilagođavaju veličini
            #self.tableWidget.verticalHeader().setSectionResizeMode(QtWidgets.QHeaderView.ResizeToContents)

            # Postavite se da se kolone automatski prilagođavaju veličini
            #self.tableWidget.horizontalHeader().setSectionResizeMode(QtWidgets.QHeaderView.ResizeToContents)

        #self.tableWidget.sizeAdjustPolicy()
        #self.label.adjustSize()

    def cell_was_clicked(self,row,column):
        cell = self.tableWidget.item(row,column)

        if(column==2): # PUBLIC KEY
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

            file_path = os.path.join("exported_public_keys/", text)
            # upis javnog kljuca u .pem formatu
            with open(file_path, 'wb') as f:
                f.write(pem_pu_key)




if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    TabelaWindow = QtWidgets.QMainWindow()
    ui = Ui_TabelaWindow()
    ui.setupUi(TabelaWindow)
    TabelaWindow.show()
    sys.exit(app.exec_())
