import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { app } from "./firebaseConfig";

const App = () => {
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [current, setCurrent] = useState("");
  const [power, setPower] = useState("");
  const [led12state, setled12state] = useState(null);
  const [led14state, setled14state] = useState(null);
  const [led27state, setled27state] = useState(null);

  const [led26state, setled26state] = useState(null);
  const [led13state, setled13state] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const readData = async () => {
    const db = getDatabase(app);

    // Read temperature data
    const temperatureRef = ref(db, "temperature");
    onValue(temperatureRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTemperature(data);
      }
    });

    // Read humidity data
    const humidityRef = ref(db, "humidity");
    onValue(humidityRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHumidity(data);
      }
    });

    // Read current data
    const currentRef = ref(db, "current");
    onValue(currentRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data >= 0) {
        setCurrent(data);
      }
    });

    // Read power data
    const powerRef = ref(db, "power");
    onValue(powerRef, (snapshot) => {
      const data = snapshot.val();
      if (data >= 0) {
        setPower(data);
      }
    });

    // Read chaneel data
    const led12Ref = ref(db, "led12state");
    onValue(led12Ref, (snapshot) => {
      const data = snapshot.val();

      setled12state(data);
    });

    // Read chaneel data
    const led13Ref = ref(db, "led13state");
    onValue(led13Ref, (snapshot) => {
      const data = snapshot.val();

      setled13state(data);
    });
    const led14Ref = ref(db, "led14state");
    onValue(led14Ref, (snapshot) => {
      const data = snapshot.val();

      setled14state(data);
    });
    const led27Ref = ref(db, "led27state");
    onValue(led27Ref, (snapshot) => {
      const data = snapshot.val();

      setled27state(data);
    });

    const led28Ref = ref(db, "led26state");
    onValue(led28Ref, (snapshot) => {
      const data = snapshot.val();

      setled26state(data);
    });
  };

  const handleToggleChannel = (channel, currentValue) => {
    const db = getDatabase();
    set(ref(db, channel), currentValue == 0 ? 1 : 0);
  };

  useEffect(() => {
    // Call readData function
    readData();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup tasks here if needed
    };
  }, []); // Empty dependency array to trigger useEffect only once on mount

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Remote Monitor</Text>
      <Reading label="Temperature:" value={temperature} />
      <Reading label="Humidity:" value={humidity} />
      <Reading label="Current:" value={current} />
      <Reading label="Power:" value={power} />
      <Text
        style={{
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: 24,
          marginTop: 20,
          textAlign: "center",
        }}
      >
        equipment conneted
      </Text>
      <View style={styles.applianceContainer}>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Appliance</Text>
          <Text style={styles.applianceText}>State</Text>
        </View>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Alarm</Text>
          <TouchableOpacity
            onPress={() => handleToggleChannel("led12state", led12state)}
          >
            <Text style={styles.applianceText}>
              {led12state == 0 ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Lights</Text>
          <TouchableOpacity
            onPress={() => handleToggleChannel("led13state", led13state)}
          >
            <Text style={styles.applianceText}>
              {led13state == 0 ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Cooler</Text>
          <TouchableOpacity
            onPress={() => handleToggleChannel("led14state", led14state)}
          >
            <Text style={styles.applianceText}>
              {led14state == 0 ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Oven</Text>
          <TouchableOpacity
            onPress={() => handleToggleChannel("led27state", led27state)}
          >
            <Text style={styles.applianceText}>
              {led27state == 0 ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.applianceRow}>
          <Text style={styles.applianceText}>Generator</Text>
          <TouchableOpacity
            onPress={() => handleToggleChannel("led26state", led26state)}
          >
            <Text style={styles.applianceText}>
              {led26state == 0 ? "OFF" : "ON"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {refreshing ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setRefreshing(true);
              readData();
              setRefreshing(false);
            }}
            style={styles.refreshButton}
          >
            <Text>Refresh</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const Reading = ({ label, value }) => (
  <View style={styles.readingContainer}>
    <Text style={styles.readingLabel}>{label}</Text>
    {label === "Temperature:" ? (
      <Text style={styles.readingValue}>{value} °C</Text>
    ) : label === "Humidity:" ? (
      <Text style={styles.readingValue}>{value} %</Text>
    ) : label === "Current:" ? (
      <Text style={styles.readingValue}>{value} A</Text>
    ) : label === "Power:" ? (
      <Text style={styles.readingValue}>{value} W</Text>
    ) : (
      <Text style={styles.readingValue}>{value}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 50,
    paddingTop: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  readingContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  readingLabel: {
    fontWeight: "bold",
    width: "40%",
    fontSize: 18,
  },
  readingValue: {
    fontSize: 16,
  },
  refreshButton: {
    backgroundColor: "lightblue",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
    marginTop: 20,
  },
  applianceContainer: {
    marginTop: 20,
  },
  applianceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  applianceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App;
