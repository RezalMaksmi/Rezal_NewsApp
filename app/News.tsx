import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const API_URL = 'https://newsapi.org/v2/top-headlines';
const API_KEY = '8579ebdf332d4ff9b4d8e46ad5242606';

// Daftar kategori berita
const CATEGORIES = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredArticles(articles);
    } else {
      const filteredData = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filteredData);
    }
  }, [searchQuery, articles]);

  const fetchNews = async (category: string) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          country: 'us',
          category,
          apiKey: API_KEY,
        },
      });
      setArticles(response.data.articles);
      setFilteredArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/DetailNews', params: { article: JSON.stringify(item) } })}
    >
      {item.urlToImage && <Image source={{ uri: item.urlToImage }} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>By {item.author || 'Unknown'}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>
        {item.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subHeader}>Kumpulan berita nasional terbaru</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Horizontal Scroll Menu */}
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

    

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{flex:1, justifyContent:'center', alignItems:'center', position:'absolute', height:'100%'} } />
      ) : (
        <FlatList
        data={filteredArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.articlesContainer}
        showsVerticalScrollIndicator={true}
        />
      )}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 15,
  },
  searchInput: {
    height: 40,
    width:400,
    
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderColor:"#E9E9E9",
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4
  },
  // Category styles
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal:10,
    marginBottom: 10,
    height:55,
  
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    height: 35,
  },
  selectedCategory: {
    backgroundColor: '#EC3636',
    height: 35,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  articlesContainer: {
    marginTop: 10,
   
  },
});
