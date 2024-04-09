import React, { Component } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
export const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  margin-top: 18px;
`;
export const StartButton = styled(Button).attrs({
  buttonColor: "#F2E1B9",
})`
  padding: 8px;
`;
export const StyleText = styled(Text)`
  text-align: center;
  font-size: 17px;
  font-weight: 600;
`;
export default function HomeScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ opacity: 0.1 }}
        source={require("./assets/background1.png")}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("./assets/botProfile2.jpg")}
            style={{
              width: 400,
              height: 400,
              borderRadius: 400 / 2,
              shadowColor: "#000",
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          />
          <Container>
            <StyleText style={{ fontSize: 30, fontWeight: 900 }}>
              שלום וברוכים הבאים
            </StyleText>
            <StyleText style={{ paddingTop: 12 }}>
              מתלבטים האם להגיש תביעה באחד מהתחומים:{" "}
            </StyleText>
            <StyleText>לשון הרע, ספאם או קניין רוחני?</StyleText>
            <StyleText>איזה כיף!</StyleText>
            <StyleText> בדיוק בשביל זה אני כאן.</StyleText>
          </Container>
          <StartButton
            contentStyle={{
              flexDirection: "row-reverse",
            }}
            textColor="black"
            icon="send"
            labelStyle={{ fontSize: 18, fontWeight: 700 }}
            onPress={() => navigation.navigate("ChatScreen")}
          >
            התחל צאט
          </StartButton>
        </View>
      </ImageBackground>
    </>
  );
}
