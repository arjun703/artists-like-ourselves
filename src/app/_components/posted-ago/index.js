export default function calculatePostedAgo(seconds) {

    if(seconds < 60){
        return 'just now'
    }

    const timeUnits = [
        { unit: 'yr', seconds: 31536000 }, // 60 * 60 * 24 * 365
        { unit: 'mo', seconds: 2592000 },  // 60 * 60 * 24 * 30
        { unit: 'd', seconds: 86400 },     // 60 * 60 * 24
        { unit: 'h', seconds: 3600 },      // 60 * 60
        { unit: 'm', seconds: 60 },        // 60
        { unit: 's', seconds: 1 }
    ];

    for (const { unit, seconds: unitSeconds } of timeUnits) {
        const count = Math.floor(seconds / unitSeconds);
        if (count >= 1) {
            return `${count}${unit}`;
        }
    }

}
