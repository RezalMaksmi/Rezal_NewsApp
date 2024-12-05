import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '8579ebdf332d4ff9b4d8e46ad5242606';

export default function DetailNews() {
  const { article } = useLocalSearchParams();
  const parsedArticle = article ? JSON.parse(article as string) : {};
  const [popularArticles, setPopularArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPopularNews();
  }, []);

  const fetchPopularNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          country: 'us',
          apiKey: API_KEY,
        },
      });
      setPopularArticles(response.data.articles.slice(0, 10)); 
    } catch (error) {
      console.error('Error fetching popular news:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPopularItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={() =>
        router.push({ pathname: '/DetailNews', params: { article: JSON.stringify(item) } })
      }
    >
      {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.popularImage} />}
      <Text style={styles.popularTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Detail berita utama */}
        <Text style={styles.header}>Detail Artikel</Text>
      {parsedArticle.urlToImage && (
        <Image source={{ uri: parsedArticle.urlToImage }} style={styles.image} />
      )}
      <Text style={styles.title}>{parsedArticle.title}</Text>
      <Text style={styles.author}>By {parsedArticle.author || 'Unknown'}</Text>
      <Text style={styles.content}>{parsedArticle.content || 'No content available.'}</Text>
      <Text />
      
      <Text style={styles.content}>{parsedArticle.content || 'No content available.'}</Text>
      <Text />
      <Text style={styles.content}>{parsedArticle.content || 'No content available.'}</Text>

      {/* Berita Populer */}
      <View style={styles.containerNewsPopuler}>
      <Text style={styles.sectionHeader}>Berita Populer</Text>
      <Text style={styles.sectionHeaderMore}>Show More</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={popularArticles}
          renderItem={renderPopularItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularContainer}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 20
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#333',
    marginBottom: 5,
    
  },
  image: {
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#505050'
  },
  author: {
    fontSize: 16,
    color: '#6E6E6E',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color:'#505050'
  },
  // Section Header
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color:'#505050',
    width:150,
  },
  // Popular News Styles
  popularContainer: {
    paddingBottom: 10,
  },
  popularCard: {
    backgroundColor: '#f8f9fa',
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    width: 350,
  },
  popularImage: {
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: 'semibold',
    paddingHorizontal: 10,
    paddingBottom: 10,
    color:'#505050'
  },
  containerNewsPopuler:{
    
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  sectionHeaderMore:{
    width:100,
    textAlign: 'right',
    right:0
  }
});
