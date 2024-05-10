import threading
import cv2
from deepface import DeepFace

faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

emo = ''

print(cap.isOpened())

if not cap.isOpened():
    raise IOError('Cannot open Camera')

while cap.isOpened():
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    faces = faceCascade.detectMultiScale(gray, 1.1, 4)

    for(x,y,w,h) in faces:
        cv2.rectangle(frame, (x,y), (x+w, y+h), (0, 255, 0), 2)
        try:
            result = DeepFace.analyze(frame, actions = ['emotion'])
            font = cv2.FONT_HERSHEY_SIMPLEX
            emo = result[0]['dominant_emotion']

            print(result)

            cv2.putText(frame,
                        result[0]['dominant_emotion'],
                        (50, 50),
                        font, 0.5,
                        (0, 0, 255),
                        2,
                        cv2.LINE_4)
        
        except:
            print('noFace')

        cv2.imshow('Original Video', frame)

        if result[0]['dominant_emotion'] == 'happy':
            exit()

        if cv2.waitKey(2) & 0xFF == ord('q'):
            exit()

cap.release()
cv2.destroyAllWindows()