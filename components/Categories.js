import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCards from "./CategoryCards";
import SanityClient from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    SanityClient.fetch(`*[_type == "category"]`).then((data) =>
      setCategories(data)
    );
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category cards */}
      {categories.map((category) => (
         <CategoryCards
         key={category._id}
         imgUrl={category.image}
         title={category.name}
       />
      ))}
    </ScrollView>
  );
};

export default Categories;
