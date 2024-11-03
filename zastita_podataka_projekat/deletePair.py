import base64
import os

from PyQt5 import QtCore, QtGui, QtWidgets


class Ui_deletePair(object):
    def setupUi(self, deletePair):
        deletePair.setObjectName("deletePair")
        deletePair.resize(800, 600)
        self.centralwidget = QtWidgets.QWidget(deletePair)
        self.centralwidget.setObjectName("centralwidget")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(40, 20, 191, 31))
        font = QtGui.QFont()
        font.setPointSize(10)

        self.label.setFont(font)
        self.label.setStyleSheet("background-color: rgb(198, 198, 198);")
        self.label.setObjectName("label")

        self.tableWidget = QtWidgets.QTableWidget(self.centralwidget)
        self.tableWidget.setGeometry(QtCore.QRect(60, 80, 191, 141))
        self.tableWidget.setShowGrid(True)
        self.tableWidget.setObjectName("tableWidget")
        self.tableWidget.setColumnCount(1)
        self.tableWidget.setRowCount(0)
        item = QtWidgets.QTableWidgetItem()
        self.tableWidget.setHorizontalHeaderItem(0, item)
        deletePair.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(deletePair)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 26))
        self.menubar.setObjectName("menubar")
        deletePair.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(deletePair)
        self.statusbar.setObjectName("statusbar")
        deletePair.setStatusBar(self.statusbar)

        # UCITAVANJE ELEMEATA TABELE
        self.tableWidget.cellClicked.connect(self.cell_was_clicked)
        self.loadProducts()

        self.retranslateUi(deletePair)
        QtCore.QMetaObject.connectSlotsByName(deletePair)

    def retranslateUi(self, deletePair):
        _translate = QtCore.QCoreApplication.translate
        deletePair.setWindowTitle(_translate("deletePair", "DeletePair"))
        self.label.setText(_translate("deletePair", "Select key id for deleting:"))
        item = self.tableWidget.horizontalHeaderItem(0)
        item.setText(_translate("deletePair", "Key Id"))


    def loadProducts(self):
        with open("key_ids_dir/key_ids_file.txt","r")as f:
            line = f.readline().split()
            self.key_ids=line
        row_cnt = len(line)
        self.tableWidget.setRowCount(row_cnt)

        for i in range(0,row_cnt):
            item = line[i]
            self.tableWidget.setItem(0, i, QtWidgets.QTableWidgetItem(item))
            self.tableWidget.resizeRowsToContents()
            self.tableWidget.resizeColumnsToContents()

    def cell_was_clicked(self, row, column):
        cell = self.tableWidget.item(row, column)
        key_id = cell.text()

        # Iteriramo po private_keys/_.txt da bismo nasli koji fajl brisemo
        private_keys_directory = "private_keys"
        files = os.listdir(private_keys_directory)
        files_txt = [f for f in files if
                     (os.path.isfile(os.path.join(private_keys_directory, f)) and f.endswith('.txt'))]

        files_for_delete=[]
        for file in files_txt:
            filepath = "private_keys/" + file
            with open(filepath, 'r') as f:
                for line in f:
                    line_arr = line.split(' admin ')
                    if (str(key_id) == line_arr[0]):
                        self.key_ids.remove(str(key_id))
                        str_pem_pu_key = line_arr[1]
                        PU_key_delete = base64.b64decode(str_pem_pu_key)
                        files_for_delete.append(file)
                        break
        print(files_for_delete)
        for file in files_for_delete:
            filename_withoutExtension = file.split('.')[0]

            # brisanje .txt fajlova
            filepath = "private_keys/" + file
            os.remove(filepath)
            filepath = "public_keys/" + file
            os.remove(filepath)

            # brisanje i pem fajlova
            filepath = "private_keys/" + filename_withoutExtension + ".pem"
            os.remove(filepath)
            filepath = "public_keys/" + filename_withoutExtension + ".pem"
            os.remove(filepath)

            #izbaci iz key_ids
            self.key_ids = [id if str(id)!=str(key_id) else None for id in self.key_ids]
            print(self.key_ids)

            #upis u fajl key_ids
            with open("key_ids_dir/key_ids_file.txt","w")as f:
                for id in self.key_ids:
                    f.write(id + ' ')

            self.loadProducts()



if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    deletePair = QtWidgets.QMainWindow()
    ui = Ui_deletePair()
    ui.setupUi(deletePair)
    deletePair.show()
    sys.exit(app.exec_())
