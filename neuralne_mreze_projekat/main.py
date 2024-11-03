import numpy as np

import logging

import tensorflow as tf

tf.get_logger().setLevel(logging.ERROR)

import matplotlib.pyplot as plt

main_path = './4klaseLoptica/'

img_size = (64, 64)
batch_size = 64

from keras.utils import image_dataset_from_directory

#podela na validacioni i skup za treniranje

Xtrain = image_dataset_from_directory(main_path,
                                      labels='inferred',
                                      subset ='training',
                                      validation_split = 0.3,
                                      image_size = img_size,
                                      batch_size = batch_size,
                                      seed = 123)
Xval = image_dataset_from_directory(main_path,
                                    labels='inferred',
                                    subset = 'validation',
                                    validation_split = 0.3,
                                    image_size = img_size,
                                    batch_size = batch_size,
                                    seed = 123)

#dodatna podela validacionog skupa
val_batches = tf.data.experimental.cardinality(Xval)
Xtest = Xval.take((2*val_batches) // 3)
Xval = Xval.skip((2*val_batches) // 3)

classes = Xtrain.class_names
print(classes)

#provera da li su klase balansirane
moguce_klase = []

for fpath in Xtrain.file_paths:
    if "american_football" in fpath:
        moguce_klase.append("1")
    elif "baseball" in fpath:
        moguce_klase.append("2")
    elif "basketball" in fpath:
        moguce_klase.append("3")
    elif "billiard_ball" in fpath:
        moguce_klase.append("4")
    elif "bowling_ball" in fpath:
        moguce_klase.append("bowling_ball")
    elif "cricket_ball" in fpath:
        moguce_klase.append("cricket_ball")
    elif "football" in fpath:
        moguce_klase.append("football")
    elif "golf_ball" in fpath:
        moguce_klase.append("8")
    elif "hockey_ball" in fpath:
        moguce_klase.append("9")
    elif "hockey_puck" in fpath:
        moguce_klase.append("10")
    elif "rugby_ball" in fpath:
        moguce_klase.append("11")
    elif "shuttlecock" in fpath:
        moguce_klase.append("12")
    elif "table_tennis_ball" in fpath:
        moguce_klase.append("13")
    elif "tennis_ball" in fpath:
        moguce_klase.append("tennis_ball")
    else:
        moguce_klase.append("15")


plt.figure()
plt.hist(moguce_klase)
plt.show()

#prikaz odbiraka svake klase
"""
N = 4
plt.figure()
for img, lab in Xtrain.take(1) :
    for i in range (N) :
        plt.subplot(2, int(N/2), i + 1)

        plt.imshow(img[i].numpy().astype('uint8'))
        plt.title(classes[lab[i]])
        plt.axis('off')

plt.show()
"""

#augmentacija dataseta
from keras import layers
from keras import Sequential

data_augmentation = Sequential(
    [
        layers.RandomFlip("horizontal", input_shape = (img_size[0], img_size[1], 3)),
        layers.RandomRotation(0.25),
        layers.RandomZoom(0.1)
    ]
)

"""
N = 4

plt.figure()
for img, lab in Xtrain.take(1):
    plt.title(classes[lab[0]])
    for i in range (N):
        aug_img = data_augmentation(img)
        plt.subplot(2, int(N / 2), i + 1)
        plt.imshow(aug_img[0].numpy().astype('uint8'))
        plt.axis('off')
plt.show()
"""

#---------------------------------------------------------------

#pravljenje modela neuralne mreze

from keras import Sequential
from keras import layers
from keras.optimizers import Adam
from keras.losses import SparseCategoricalCrossentropy

num_classes = len(classes)

model = Sequential([
    data_augmentation,
    layers.Rescaling(1./255, input_shape=(64, 64, 3)),
    layers.Conv2D(20, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding='same', activation='relu'),
    layers.MaxPooling2D(),
    layers.Dropout(0.2),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(num_classes, activation='softmax')
])

model.summary()

model.compile(Adam(learning_rate=0.001),
              loss= 'sparse_categorical_crossentropy',
              metrics='accuracy')


history = model.fit(Xtrain,epochs=70,validation_data=Xval,verbose=0)


acc = history.history['accuracy']
val_acc = history.history['val_accuracy']

loss = history.history['loss']
val_loss = history.history['val_loss']

plt.figure()

plt.subplot(121)
plt.plot(acc)
plt.plot(val_acc)
plt.title('Accuracy')

plt.subplot(122)
plt.plot(loss)
plt.plot(val_loss)
plt.title('Loss')

plt.show()


#na trening skupu -> tacnost i cm
labelsTrain = np.array([])
predTrain = np.array([])
for img, lab in Xtrain:
    labelsTrain = np.append(labelsTrain, lab)
    predTrain = np.append(predTrain, np.argmax(model.predict(img, verbose=0), axis=1))

from sklearn.metrics import accuracy_score
print('Tacnost modela je: ' + str(100 * accuracy_score(labelsTrain, predTrain)) + '%')


from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
cm = confusion_matrix(labelsTrain, predTrain, normalize='true')
cmDisplay = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=classes)
cmDisplay.plot()
plt.show()

#na test skupu -> tacnost i cm
labelsTest = np.array([])
predTest = np.array([])
for img, lab in Xtest:
    labelsTest = np.append(labelsTest, lab)
    predTest = np.append(predTest, np.argmax(model.predict(img, verbose=0), axis=1))

from sklearn.metrics import accuracy_score
print('Tacnost modela je: ' + str(100 * accuracy_score(labelsTest, predTest)) + '%')


from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
cm = confusion_matrix(labelsTest, predTest, normalize='true')
cmDisplay = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=classes)
cmDisplay.plot()
plt.show()

#primeri dobro i lose klasifikovanih primeraka dataseta

dobra = False
losa = False

plt.figure()
for img, lab in Xval:
    pred = np.argmax(model.predict(img, verbose=0), axis=1)
    i = 0
    while i<len(lab):
        imgg = img[i]
        labb = lab[i]
        predikcija = pred[i]
        i = i + 1

        if labb == predikcija and dobra == False:
            dobra = True
            plt.subplot(1, 2, 1)
            plt.imshow(imgg.numpy().astype('uint8'))
            plt.axis('off')
            plt.title('Dobra')

        elif labb != predikcija and losa == False:
            losa = True
            plt.subplot(1, 2, 2)
            plt.imshow(imgg.numpy().astype('uint8'))
            plt.axis('off')
            plt.title('Losa')

        if dobra and losa:
            break

    plt.show()
