import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const questions = [
  "How often do you forget recent events or conversations?",
  "Do you have difficulty recalling names or faces of familiar people?",
  "Have you noticed changes in your ability to remember appointments or important dates?",
  "Do you frequently misplace items or have trouble retracing your steps to find them?",
  "Have you experienced episodes of getting lost in familiar places?",
  "Do you find it challenging to concentrate on tasks or conversations?",
  "Do you often lose track of what you were saying or doing?",
  "Are you easily distracted by noises or other stimuli?",
  "Do you have difficulty following written instructions or completing tasks that require sustained attention?",
  "Have you noticed changes in your ability to focus on one thing at a time?",
  "Have you experienced difficulty finding the right words when speaking or writing?",
  "Do you have trouble understanding or following conversations?",
  "Have others noticed changes in your ability to express yourself verbally?",
  "Have you had trouble reading or comprehending written materials?",
  "Do you struggle to initiate or maintain conversations with others?",
  "Do you struggle with planning or organizing daily activities?",
  "Have you noticed changes in your ability to make decisions or solve problems?",
  "Are you experiencing difficulties with multitasking or managing time effectively?",
  "Have you had trouble setting and achieving goals or completing tasks on schedule?",
  "Do you find it challenging to adapt to changes in routine or unexpected situations?",
  "Have you had trouble judging distances or spatial relationships?",
  "Do you find it challenging to navigate familiar routes or maps?",
  "Have you noticed changes in your ability to recognize objects or faces?",
  "Do you experience difficulty with activities that require hand-eye coordination, such as drawing or assembling objects?",
  "Have you had trouble differentiating between similar-looking objects or images?",
  "Are you aware of the current date, day of the week, and time?",
  "Do you know your current location and address?",
  "Have you experienced confusion about the season or year?",
  "Do you have difficulty remembering where you are or how you got there?",
  "Have others noticed changes in your awareness of time and place?"
];

const answers = ['Never', 'Rarely', 'Sometimes', 'Often'];
const answerPoints = [1, 2, 3, 4];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const answerButtonOpacities = useRef(
    answers.map(() => new Animated.Value(1))
  ).current;

  const handleAnswerPress = (index: number) => {
    Animated.timing(answerButtonOpacities[index], {
      toValue: 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setScore(score + answerPoints[index]);
      setCurrentQuestion(currentQuestion + 1);
      Animated.timing(answerButtonOpacities[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.card}>
        <Text style={styles.title}>Dementia Quiz</Text>
        <View style={styles.questionContainer}>
          {currentQuestion < questions.length ? (
            <>
              <Text style={styles.question}>
                {questions[currentQuestion]}
              </Text>
              <View style={styles.answerContainer}>
                {answers.map((answer, index) => (
                  <View key={index} style={styles.answerButtonContainer}>
                    <TouchableOpacity
                      style={[styles.answerButton, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
                      onPress={() => handleAnswerPress(index)}
                      activeOpacity={0.5}
                    >
                      <Animated.View style={{ opacity: answerButtonOpacities[index] }}>
                        <Text style={styles.answerText}>{answer}</Text>
                      </Animated.View>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <Text style={styles.questionNumberText}>
                {currentQuestion + 1} / {questions.length}
              </Text>
            </>
          ) : (
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreText}>
                Your total score: {score} points
              </Text>
              {score >= 105 ? (
                <Text style={styles.scoreText}>
                  This indicates you may have severe cognitive impairment.
                </Text>
              ) : score >= 80 ? (
                <Text style={styles.scoreText}>
                  This indicates you may have moderate cognitive impairment.
                </Text>
              ) : score >= 55 ? (
                <Text style={styles.scoreText}>
                  This indicates you may have mild cognitive impairment.
                </Text>
              ) : (
                <Text style={styles.scoreText}>
                  This indicates you have normal cognition.
                </Text>
              )}
            </View>
          )}
        </View>
        <View style={[styles.progressBar]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: '70%',
    width: '90%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  answerButtonContainer: {
    marginRight: 10,
    flex: 1,
  },
  answerButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
  },
  answerText: {
    fontSize: 16,
    color: '#fff',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#007AFF',
    width: '100%',
    borderRadius: 5,
  },
  questionNumberText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});