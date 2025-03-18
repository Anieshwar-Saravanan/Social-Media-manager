require("dotenv").config({ path: "./instagram_variables.env" });
const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");

const ig = new IgApiClient();

const initializeInstagram = async () => {
    if (!process.env.IG_USERNAME || !process.env.IG_PASSWORD) {
        console.error("Error: Instagram credentials not found!");
        process.exit(1);
    }

    try {
        ig.state.generateDevice(process.env.IG_USERNAME);
        await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        console.log("Logged into Instagram!");
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

const postToInsta = async () => {
    try {
        if (!ig.state.checkpoint) {
            await initializeInstagram();
        }

        const imageBuffer = fs.readFileSync("./city.jpeg");

        await ig.publish.photo({
            file: imageBuffer,
            caption: "Really nice photo from the internet!",
        });

        console.log("Posted to Instagram!");
    } catch (error) {
        console.error("Error posting to Instagram:", error);
    }
};

const getAnalytics = async () => {
    try {
        if (!ig.state.checkpoint) {
            await initializeInstagram();
        }

        const user = await ig.user.searchExact(process.env.IG_USERNAME);
        const userId = user.pk;

        const userFeed = ig.feed.user(userId);
        const posts = await userFeed.items();
        if (posts.length === 0) {
            console.log("No posts found!");
            return;
        }
        for (let i = 0; i < posts.length; i++) {
            const latestPost = posts[i];
            console.log("Instagram Post Analytics");
            console.log(`Post ID: ${latestPost.id}`);
            console.log(`Caption: ${latestPost.caption ? latestPost.caption.text : "No caption"}`);
            console.log(`Likes: ${latestPost.like_count}`);
            console.log(`Comments: ${latestPost.comment_count}`);

        }
    } catch (error) {
        console.error("Error fetching analytics:", error);
    }
};

const getLatestPost = async () => {
    try {
        if (!ig.state.checkpoint) {
            await initializeInstagram();
        }

        const user = await ig.user.searchExact(process.env.IG_USERNAME);
        const userId = user.pk;

        const userFeed = ig.feed.user(userId);
        const posts = await userFeed.items();
        if (posts.length === 0) {
            console.log("No posts found!");
            return;
        }
        const latestPost = posts[0];
        console.log("Instagram Post Analytics");
        console.log(`Post ID: ${latestPost.id}`);
        console.log(`Caption: ${latestPost.caption ? latestPost.caption.text : "No caption"}`);
        console.log(`Likes: ${latestPost.like_count}`);
        console.log(`Comments: ${latestPost.comment_count}`);
    } catch (error) {
        console.error("Error fetching analytics:", error);
    }
}

(async () => {
    await initializeInstagram();
    await postToInsta();
    await getAnalytics();
    await getLatestPost();
})();
