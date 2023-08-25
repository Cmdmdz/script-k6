
// Smoke Test
export let Smoke = {
    vus: 1,  // 1 user
    duration: '60s'  // for 1 minute
};

// Average Load Test
export let Average = {
    vus: 100,  // simulate average 100 users
    duration: '300s'  // for 5 minutes
};

// Stress Test
export let Stress = {
    stages: [
        { duration: '2m', target: 100 },  // ramp up to 100 users over 2 minutes
        { duration: '5m', target: 100 },  // stay at 100 users for 5 minutes
        { duration: '2m', target: 400 },  // ramp up to 400 users over 2 minutes
        { duration: '5m', target: 0 },    // scale down. Recovery stage.
    ],
};

// Soak Test

export let Soak = {
    vus: 50,  // moderate load
    duration: '8h'  // run it for 8 hours
};

// Spike Test
export let Spike = {
    stages: [
        { duration: '2m', target: 50 },
        { duration: '1m', target: 300 },  // spike
        { duration: '1m', target: 50 },   // back to normal
    ],
};

// Breakpoint Test
export let Breakpoint = {
    stages: [
        { duration: '5m', target: 100 },
        { duration: '5m', target: 200 },
        { duration: '5m', target: 300 },
        // ... continue increasing until the system breaks
    ],
};
