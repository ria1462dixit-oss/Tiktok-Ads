# TikTok Ads Campaign Creator

A React application for creating and managing TikTok advertising campaigns with an intuitive interface for campaign setup, ad text creation, and music selection.

## Features

- **Account Connection**: Secure OAuth connection to TikTok Ads Manager
- **Campaign Creation**: Create campaigns with customizable objectives (Traffic, Conversions)
- **Ad Text Management**: Character-limited ad text input with real-time validation
- **Music Integration**: Multiple music options including existing track IDs, custom uploads, or no music
- **Form Validation**: Comprehensive validation with real-time error feedback
- **Session Management**: Automatic session expiry handling with reconnection flow

## Tech Stack

- **Frontend**: React 19.2.4 with Vite
- **Styling**: Custom CSS with modern design patterns

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Connect Account**: Click "Connect TikTok Account" on the landing page
2. **Create Campaign**: Fill in campaign details including name and objective
3. **Add Content**: Write ad text and select call-to-action
4. **Choose Music**: Select from existing tracks, upload custom audio, or proceed without music
5. **Submit**: Create your campaign and receive confirmation

## Campaign Objectives

- **Traffic**: Drive users to your website or landing page
- **Conversions**: Optimize for specific actions (requires music selection)

## Music Options

- **Existing ID**: Use a track from TikTok's music library (8-12 digit ID required)
- **Custom Upload**: Upload your own audio file
- **No Music**: Proceed without background music (not available for Conversion campaigns)

