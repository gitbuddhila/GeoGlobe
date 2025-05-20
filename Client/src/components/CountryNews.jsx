import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Link,
  Button,
  useTheme
} from "@mui/material";
import {
  Article,
  MoreHoriz
} from "@mui/icons-material";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const fetchCountryNews = async (countryCode) => {
  const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log("NEWS API RESPONSE", data); // <-- log response

  if (!response.ok) {
    throw new Error(data.message || "News API error");
  }

  return data;
};

function CountryNews({ countryCode, countryName }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCountryNews(countryCode);
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Unable to load news data");
      } finally {
        setLoading(false);
      }
    };

    if (countryCode) {
      getNews();
    }
  }, [countryCode]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const getAvatarColor = (source) => {
    let hash = 0;
    for (let i = 0; i < source.length; i++) {
      hash = source.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7',
      '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
      '#009688', '#4caf50', '#8bc34a', '#cddc39',
      '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Card sx={{
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: theme.shadows[3],
      mt: 3
    }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #5614B0 0%, #DBD65C 100%)',
        color: 'white',
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Article fontSize="large" />
        <Box>
          <Typography variant="h6" fontWeight="bold">Latest News</Typography>
          <Typography variant="body2">
            Headlines from {countryName}
          </Typography>
        </Box>
      </Box>

      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error || news.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" py={3}>
            {error || "No news available at the moment"}
          </Typography>
        ) : (
          <List>
            {news.map((article, index) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    py: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1
                    },
                    transition: 'background-color 0.2s'
                  }}
                >
                  <ListItemIcon sx={{ mt: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: getAvatarColor(article.source.name),
                        width: 40,
                        height: 40
                      }}
                    >
                      {article.source.name.charAt(0)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 0.5 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{
                            flex: 1,
                            lineHeight: 1.4
                          }}
                        >
                          {article.title}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          sx={{ display: 'block', mb: 1 }}
                        >
                          {article.description}
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mt: 1
                        }}>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {article.source.name}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {formatDate(article.publishedAt)}
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                {index < news.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}

        {/* Always show this button */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            endIcon={<MoreHoriz />}
            sx={{ px: 4, py: 1 }}
            href={`https://news.google.com/search?q=${encodeURIComponent(countryName)}`}
            target="_blank"
            rel="noopener"
          >
            Find More News
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CountryNews;
