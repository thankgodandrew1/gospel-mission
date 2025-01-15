# Gospel Mission

Gospel Mission is a personal website designed for Elder Andrew, a full-time missionary of the Church Of Jesus Christ of Latter-day Saints, to teach others about the restored gospel. The site includes a blog, lessons, and other resources to help visitors learn and grow spiritually. This project serves as a platform to share educational content, foster spiritual growth, and help users engage with the teachings of the Church.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Site Structure](#site-structure)
- [Timeline](#timeline)
- [Future Features](#future-features)
- [Contact Information](#Contact-information)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The Gospel Mission website features:
- A **Home Page**: Welcomes visitors and introduces the missionary lessons and featured blog posts.
- A **Blog Page**: Lists all blog posts with snippets, dates, and a detailed view for each post.
- An **Admin Page**: Allows for the management of blog posts, including creating, editing, and deleting.
- A **Lessons Page**: Provides detailed explanations of important missionary lessons with links to pamphlets and additional resources.
- An **About Page**: A biography of Elder Andrew and his mission.
- A **Contact Page**: Allows visitors to submit questions or feedback.
- A **Testimonies Page**: Enables visitors to share or read testimonies related to the teachings.

## Technologies Used
- **Next.js**: A React-based framework for server-side rendering and static site generation, which ensures a fast and SEO-friendly experience.
- **MongoDB + Mongoose**: A NoSQL database solution, with Mongoose providing a simple interface for handling data like blog posts and lessons.
- **Cloudinary**: A cloud-based service used for managing image uploads, allowing for easy integration and scalability.
- **Tailwind CSS**: A utility-first CSS framework used for building custom and responsive designs quickly.
- **React Markdown**: A React component that helps in rendering Markdown-formatted content for blog posts.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/thankgodandrew1/gospel-mission.git
    cd gospel-mission
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file and add your environment variables:
    ```env
    MONGODB_URI=your-mongodb-uri
    DATABASE_NAME=your-database-name
    CLOUDINARY_CLOUD_NAME=your-cloudinary-name
    CLOUDINARY_API_KEY=your-cloudinary-key
    CLOUDINARY_API_SECRET=your-cloudinary-secret
    NEXT_PUBLIC_SECRET_TOKEN=for-admin-pages-protection
    JWT_SECRET=for-api-routes-protection
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
- Navigate to `http://localhost:3000` to view the site.
- Use the admin pages for management purposes.

## Site Structure
1. **Home Page**: 
    - Header: Displays the site title and navigation links.
    - Main Highlights: Features missionary lessons with their title, description, images, and links to the pamphlet.
    - Footer: Contains links to Church resources and social media.

2. **Blog Page**:
    - Blog Posts List: Displays all blog posts with their title, snippet, and publish date.
    - Single Blog Post Page: Shows the full blog content with options for social sharing and navigation to other posts.

3. **Admin Page**:
    - Allows the management of site content.

4. **Lessons Page**: Provides detailed lessons on key topics with links to additional resources, such as pamphlets.

5. **About Page**: Features a biography of Elder Andrew and an explanation of the site's purpose.

6. **Contact Page**: Contains a form for visitors to send feedback or questions, with an optional map of nearby Church meetinghouses.

7. **Testimonies Page**: A section for visitors to share and read spiritual testimonies.

## Timeline
With consistent effort, I completed the site in **16 days**:
- **Days 1-3**: Project setup, database connection, and API endpoint creation.
- **Days 4-6**: Building the homepage and fetching lesson data from the API.
- **Days 7-9**: Developing the blog and individual blog post pages.
- **Days 10-12**: Creating the admin page with post management features.
- **Days 13-15**: Implementing other pages (About, Lessons, Contact).
- **Style as I code**: Styling with Tailwind CSS and testing responsiveness.
- **Day 16**: Final testing, optimizations, and deployment.

## Future Features
Some future features that could enhance the site include:
- **Comment System**: Allow users to comment on blog posts for more interactive engagement.
- **Email Subscription**: Let visitors subscribe to receive new blog posts or updates via email.
- **User Profiles**: Create user accounts where visitors can track their learning progress or contribute content.


## Contact Information:
   > **Contact**:  
   You can reach me via email at [thankgod.andrew@missionary.org] or open an issue on GitHub for any inquiries.

## Contributing
This is a personal project, and contributions are not currently accepted. However, if you'd like to collaborate in the future, feel free to fork the project and make improvements on your own!

## License
This project is licensed under the MIT License.
