# Sneejigram - A Community-Driven Social Network

**Sneejigram** is a modern social network platform designed for users to create and join communities, share posts, and engage in dynamic discussions. With features like collaborative threads, customizable communities, and a robust access control system, Orion aims to bring people together around shared interests and passions.

## Features

- **Community-Centric**: Create, join, and manage communities based on interests, hobbies, or professional topics.
- **Dynamic Discussions**: Engage in threaded discussions with the ability to create sub-threads for deeper conversations.
- **Access Control Matrix (ACM)**: Robust role-based permission system to manage community moderation and user access.
- **Gamification**: Earn badges and rise through community leaderboards based on participation and contributions.
- **Customizable Profiles**: Showcase your interests, posts, and community memberships on your personal profile.
- **Community Challenges**: Participate in or create community-wide challenges and events to encourage engagement.

## Tech Stack

- **Frontend**: Nuxt.js
- **Backend**: Nitro
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Access Control Matrix (ACM)
  
## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Innosan/sneejigram.git
    ```

2. Install dependencies:

    ```bash
    pnpm i
    ```

3. Run database creation script (with seeding data):

    ```bash
    pnpm run setup-db
    ```

4. Start the development server:

    ```bash
    pnpm run dev
    ```

5. Access the app at `http://localhost:3000`.

## Development

- **Contributing**: Contributions are welcome! Feel free to open an issue or submit a pull request to improve the platform.
- **Issues**: For issues and bug reports, please visit the [issues page](https://github.com/yourusername/Orion-Social-Network/issues).

## License

This project is licensed under the MIT License.

## Future Enhancements

- **Mobile App**: Build a mobile-first experience with support for native apps.
- **Advanced Moderation Tools**: Implement AI-powered moderation tools to automatically detect inappropriate content.

## TODO:
- Filtering system (highest-rated content, most active users, etc.)