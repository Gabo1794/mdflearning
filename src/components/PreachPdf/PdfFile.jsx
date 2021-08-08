import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../mdf_logo.png";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  preachTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  vote_text: {
    fontSize: 10,
  },
  image: {
    width: 150,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center"
  }
});

const PdfFile = (props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.preachTitle}>
              Enseñanza del {props.preachDate}
            </Text>
            <Image style={styles.image} source={logo} />
          </View>
          <View style={styles.subtitle}>
            <Text style={styles.vote_text}>{props.preachText}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfFile;
