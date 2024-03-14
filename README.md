# PingAlmacenes

PingAlmacenes is an Electron-based desktop application for monitoring the ping to different warehouses. This tool is useful for keeping track of the network connection status of multiple warehouse locations in real-time.

## Features

- Real-time ping monitoring for multiple IP addresses.
- Customizable settings for adding and removing ips.
- Persistent setting storage across application restarts.
- Simple and easy-to-use interface.

- When you add a new IP, press Control + R to see the ping, only when the IP is new.


## Prerequisites

Before starting, make sure you have Node.js installed on your system. If you don't have it installed, you can download and install it from the [Node.js official website](https://nodejs.org/).

## Getting Started

To run PingAlmacenes on your local system, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourGitHubUsername/pingalmacenes.git
    cd pingalmacenes
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm start
    ```

## Packaging and Distribution

To generate an executable build of the application for Windows, Mac, and Linux:

```bash
npm run dist
