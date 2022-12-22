import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { EnviromentButton } from "../components/EnviromentButton";

import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";
import { PlantProps } from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import allPlants from "../services/plants";
import plantsEnvironments from "../services/enviroments";

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect({ navigation }: { navigation: any }) {
  const [enviroments, setEnvirtoments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handleEnrivomentSelected(environment: string) {
    setEnviromentSelected(environment);

    if (environment == "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
  }

  async function fetchPlants() {
    const data = allPlants;

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const data = plantsEnvironments;
      setEnvirtoments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  function searchFilter(text: any) {    
    if (text) {
      const newData = plants.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearch(text);
      setFilteredPlants(newData);
    } else {
      setSearch(text);
      setFilteredPlants(plants);
    }
  }

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <TextInput
        style={styles.inputSearch}
        value={search}
        onChangeText={(text) => searchFilter(text)}
        placeholder="Search ..."
      />

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnrivomentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
              key={item.id}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 25,
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 18,
    lineHeight: 20,
  },
  subtitle: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 18,
    lineHeight: 20,
  },
  inputSearch: {
    color: colors.heading,
    fontFamily: fonts.text,
    height: 40,
    borderWidth: 1,
    borderColor: colors.shape,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 6,
    marginVertical: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
