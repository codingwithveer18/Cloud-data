async function fetchData() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzvpf9KbFpbLsHelpZVjM4Kcp1L5MbfFycSqun5641ouyyltV-ldhB0ncuiSOwb0V9D2w/exec");
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();

        // Assuming data is an array of objects with the same structure as your JSON data
        let innerHtml = "";
        for (let i = 0; i < data.length; i++) {
            let completed = data[i]["Total Completions of both Pathways"] === "Yes" ? "Yes" : "No";
            let redeemed = data[i]["Redemption Status"] === "Yes" ? "Yes" : "No";
            let template = `<tr>
                <td>${data[i]["Student Name"]}</td>
                <td>${data[i]["# of Courses Completed"]}</td>
                <td>${data[i]["# of Skill Badges Completed"]}</td>
                <td>${data[i]["# of GenAI Game Completed"]}</td>
                <td>${completed}</td>
                <td>${redeemed}</td>
            </tr>`;
            innerHtml += template;
        }
        document.getElementById("tableBody").innerHTML = innerHtml;
    } catch (error) {
        console.error(error);
    } finally {
        document.querySelector(".overlay").style.display = "none";
    }
}

// Call the fetchData function when the page loads
document.addEventListener("DOMContentLoaded", fetchData);
