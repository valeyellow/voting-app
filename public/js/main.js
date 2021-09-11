// grab the ui elements
const form = document.getElementById("vote-form");

// Form submit event
form.addEventListener("submit", (e) => {
  const userChoice = document.querySelector(
    "input[name=biryani]:checked"
  ).value;
  const data = { food: userChoice };

  // IIAFE (Immediately Invoked Async Function Expression)
  (async () => {
    try {
      const response = await fetch("http://localhost:3000/poll", {
        method: "post",
        body: JSON.stringify(data),
        headers: new Headers({
          "content-type": "application/json",
        }),
      });
      const jsonResponse = await response.json();
    } catch (error) {
      console.log(error);
    }
  })();

  e.preventDefault();
});

// fetch the votes
(async () => {
  try {
    const data = await fetch("http://localhost:3000/poll");
    const formattedData = await data.json();

    const { votes } = formattedData;
    const totalVotes = votes.length;

    const voteCounts = votes.reduce(
      (acc, vote) => (
        (acc[vote.food] = (acc[vote.food] || 0) + parseInt(vote.points, 10)),
        acc
      ),
      {}
    );

    let dataPoints = [
      { label: "Meghana", y: voteCounts.Meghana },
      { label: "Manis", y: voteCounts.Manis },
      { label: "Shanmukha", y: voteCounts.Shanmukha },
      { label: "Paradise", y: voteCounts.Paradise },
      { label: "Else", y: voteCounts.Else },
    ];

    console.log("hello ", voteCounts);

    const chartContainer = document.querySelector("#chartContainer");

    if (chartContainer) {
      const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "theme1",
        title: {
          text: `Total Votes - ${totalVotes}`,
        },
        data: [
          {
            type: "column",
            dataPoints,
          },
        ],
      });
      chart.render();

      // Enable pusher logging - don't include this in production
      Pusher.logToConsole = true;

      const pusher = new Pusher("07efca5f2beda425ca35", {
        cluster: "ap2",
      });

      const channel = pusher.subscribe("poll");
      channel.bind("vote", (data) => {
        dataPoints = dataPoints.map((x) => {
          if (x.label === data.food) {
            x.y += data.points;
            return x;
          }
          return x;
        });
        chart.render();
      });
    }
  } catch (error) {
    console.log("Unable to fetch vote data :(", error);
  }
})();
