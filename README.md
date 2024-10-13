# News Aggregator API

## Project Overview
The News Aggregator API is a Node.js-based application designed to fetch, cache, and manage news articles from various sources. It supports user authentication, news article management (marking as read or favorite), search functionality, and caching to reduce external API calls.

### Key Features:
- **User Authentication**: Register and login functionality using bcrypt for password hashing and JWT for token-based authentication.
- **News Article Management**: Endpoints to mark articles as read or favorite.
- **Search Functionality**: Allows users to search for articles based on keywords.
- **Caching**: In-memory caching to store and manage news articles, reducing the load on external API calls.
- **Periodic Cache Updates**: Simulates real-time news updates by periodically refreshing the cached articles.

## Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- npm (Node Package Manager)

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/news-aggregator-api.git
   cd news-aggregator-api
