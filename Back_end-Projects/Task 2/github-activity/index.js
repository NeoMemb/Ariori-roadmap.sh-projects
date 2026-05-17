#!/usr/bin/env node
const [,, username] = process.argv;

if (!username) {
    console.error("Please provide a GitHub username.");
    process.exit(1);
}

async function fetchGitHubActivity(username) {
    const url = `https://api.github.com/users/${username}/events`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error("Failed to fetch GitHub activity:", error.message);
        process.exit(1);
    }
}

fetchGitHubActivity(username).then(events => {
        console.log(`Recent activity for ${username}:`);
        events.forEach(event => {
            console.log(`- [${event.type}] ${event.repo.name} at ${new Date(event.created_at).toLocaleString()}`);
        });
    }
)
.catch(error => {
    console.error("Error processing GitHub activity:", error.message);
    process.exit(1);
});
