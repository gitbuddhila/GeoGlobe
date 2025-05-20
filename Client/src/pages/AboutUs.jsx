import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Avatar,
  Stack,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";

import worldmap from "../assets/mapworld.jpg";
import PublicIcon from "@mui/icons-material/Public";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupsIcon from "@mui/icons-material/Groups";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LanguageIcon from "@mui/icons-material/Language";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Custom Globe SVG Component
const GlobeSVG = ({ size = 200, color = "#3f51b5" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="45" fill="#ffffff" stroke={color} strokeWidth="2" />
    <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke={color} strokeWidth="1" />
    <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="1" />
    <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="1" />
    <path
      d="M 20,35 Q 35,20 50,35 T 80,35"
      fill="none"
      stroke={color}
      strokeWidth="1"
    />
    <path
      d="M 20,65 Q 35,80 50,65 T 80,65"
      fill="none"
      stroke={color}
      strokeWidth="1"
    />
    <path
      d="M 30,25 Q 40,40 55,25"
      fill="none"
      stroke={color}
      strokeWidth="1"
    />
    <path
      d="M 30,75 Q 40,60 55,75"
      fill="none"
      stroke={color}
      strokeWidth="1"
    />
  </svg>
);

// Team Member Avatar Component
const TeamMember = ({ name, role, color }) => {
  return (
    <Box textAlign="center" mx={2} mb={4}>
      <Avatar
        sx={{
          width: 120,
          height: 120,
          bgcolor: color,
          fontSize: "3rem",
          margin: "0 auto",
          mb: 2,
        }}
      >
        {name.charAt(0)}
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {role}
      </Typography>
    </Box>
  );
};

// World Map SVG Component
const WorldMapSVG = ({ width = 280, height = 150, color = "#3f51b5" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 280 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M30,60 Q50,50 70,60 T110,60 T150,60 T190,60 T230,60"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M40,80 Q60,70 80,80 T120,80 T160,80 T200,80 T240,80"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M50,100 Q70,90 90,100 T130,100 T170,100 T210,100"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <circle cx="70" cy="50" r="5" fill={color} />
    <circle cx="120" cy="70" r="4" fill={color} />
    <circle cx="180" cy="60" r="6" fill={color} />
    <circle cx="210" cy="90" r="3" fill={color} />
  </svg>
);

// Featured Region Card Component
const FeaturedRegionCard = ({ region, description, icon, color, onClick }) => {
  const Icon = icon;

  return (
    <Card
      elevation={3}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      onClick={onClick}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", mb: 2, color: color }}>
          <Icon fontSize="large" />
        </Box>
        <Typography variant="h5" component="div" gutterBottom>
          {region}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box px={2} pb={2}>
        <Button size="small" color="primary" endIcon={<ArrowForwardIcon />}>
          Explore Region
        </Button>
      </Box>
    </Card>
  );
};

// Statistics Item Component
const StatItem = ({ value, label, icon }) => {
  const Icon = icon;
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        textAlign: "center",
        height: "100%",
        borderRadius: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <Icon sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {value}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
};

// Main About Us Page Component
export default function AboutUs() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          pt: 7,
          pb: 5,
          mt: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ opacity: 0.8 }}>
                WELCOME TO
              </Typography>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                GeoGlobe
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Exploring our world one country at a time
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "background.paper",
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: "background.paper",
                    opacity: 0.9,
                  },
                  mr: 2,
                }}
                onClick={() => navigate('/')}
              >
                Explore Countries
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "background.paper",
                  color: "background.paper",
                  "&:hover": {
                    borderColor: "background.paper",
                    opacity: 0.9,
                  },
                }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  "&:before": {
                    content: '""',
                    position: "absolute",
                    height: "120%",
                    top: "-10%",
                    left: "-10%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={worldmap}
                  alt="World Map"
                  sx={{
                    margin: "-300px 0px 0px 600px",
                    width: "50%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: theme.shadows[4],
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <WorldMapSVG
              width="100%"
              height="300"
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              GeoGlobe was founded with a passion for geography and a mission to
              make comprehensive information about countries accessible to
              everyone. We believe that understanding the world's nations is the
              first step toward global citizenship.
            </Typography>
            <Typography variant="body1" paragraph>
              Powered by the REST Countries API, our platform provides detailed
              information about every country, from population statistics and
              languages to currencies and regional classifications.
            </Typography>
            <Box mt={3}>
              <Button variant="contained" endIcon={<ArrowForwardIcon />}>
                Our Story
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="" gutterBottom>
            GeoGlobe in Numbers
          </Typography>
          <Typography
            variant="body1"
            align-item="left"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: "700px", mx: " " }}
          >
            Explore our comprehensive database of global geographical
            information
          </Typography>

          <Grid container spacing={3} justifyContent="">
            <Grid item xs={6} md={3}>
              <StatItem value="195+" label="Countries" icon={FlagIcon} />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem value="7" label="Continents" icon={PublicIcon} />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem value="5000+" label="Data Points" icon={ExploreIcon} />
            </Grid>
            <Grid item xs={6} md={3}>
              <StatItem value="25+" label="Languages" icon={LanguageIcon} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Regions */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Featured Regions
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: "700px", mx: "auto" }}
        >
          Explore detailed information about countries from various regions of
          the world
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturedRegionCard
              region="Europe"
              description="Discover the diverse cultures, languages, and histories of European nations from Scandinavia to the Mediterranean."
              icon={LocationOnIcon}
              color={theme.palette.primary.main}
              onClick={() => navigate('/region/europe')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturedRegionCard
              region="Asia"
              description="Explore the largest continent with its rich tapestry of ancient civilizations and rapidly developing economies."
              icon={LocationOnIcon}
              color={theme.palette.secondary.main}
              onClick={() => navigate('/region/asia')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeaturedRegionCard
              region="Africa"
              description="Learn about the diverse nations of Africa, from its northern Mediterranean shores to the southern Cape."
              icon={LocationOnIcon}
              color={theme.palette.error.main}
              onClick={() => navigate('/region/africa')}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Our Team Section */}
      <Box sx={{ bgcolor: "background.paper", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Our Team
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: "700px", mx: "auto" }}
          >
            Meet the passionate geographers and developers behind GeoGlobe
          </Typography>

          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            <TeamMember
              name="Buddhila Herath"
              role="Founder & Lead Developer"
              color={theme.palette.primary.main}
            />
            <TeamMember
              name="Maria Garcia"
              role="Data Scientist"
              color={theme.palette.secondary.main}
            />
            <TeamMember
              name="James Wilson"
              role="Geography Expert"
              color={theme.palette.error.main}
            />
            <TeamMember
              name="Priya Sharma"
              role="UI/UX Designer"
              color={theme.palette.warning.main}
            />
          </Box>
        </Container>
      </Box>

      {/* Contact/Footer Section */}
      <Box
        sx={{ bgcolor: "primary.dark", color: "primary.contrastText", py: 6 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PublicIcon sx={{ fontSize: 40, mr: 1 }} />
                <Typography variant="h4">GeoGlobe</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Exploring the world through data. Our comprehensive platform
                provides detailed information about every nation on Earth.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" sx={{ color: "primary.contrastText" }}>
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "primary.contrastText" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "primary.contrastText" }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: "primary.contrastText" }}>
                  <LinkedInIcon />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Button onClick={() => navigate('/')} sx={{ display: 'block', color: 'primary.contrastText', textAlign: 'left' }}>
                Home
              </Button>
              <Button onClick={() => navigate('/all')} sx={{ display: 'block', color: 'primary.contrastText', textAlign: 'left' }}>
                Explore Countries
              </Button>
              <Button onClick={() => navigate('/region')} sx={{ display: 'block', color: 'primary.contrastText', textAlign: 'left' }}>
                Compare Regions
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" paragraph sx={{ opacity: 0.8 }}>
                Have questions or suggestions? We'd love to hear from you.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "primary.contrastText",
                  color: "primary.contrastText",
                  "&:hover": {
                    borderColor: "primary.contrastText",
                    opacity: 0.9,
                  },
                }}
              >
                Get in Touch
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} GeoGlobe. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}