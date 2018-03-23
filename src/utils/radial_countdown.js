export let calculateRadialCss = (percentage) => {
    if (percentage === Infinity) {
        percentage = 0;
    }
    let mainColor = '#2E7D32';
    let secondaryColor = '#E0E0E0';
    if (percentage <= 0.25) {
        return `linear-gradient(-${(90 - (90 * percentage / 0.25))}deg, ${mainColor} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(90deg, ${mainColor} 50%, ${secondaryColor} 50%, ${secondaryColor})`

    } else if (percentage > 0.25 && percentage <= 0.5) {
        return `linear-gradient(${(90 * ((percentage / 0.25) - 1))}deg, ${mainColor} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(90deg, ${mainColor} 50%, ${secondaryColor} 50%, ${secondaryColor})`

    } else if (percentage > 0.5 && percentage <= 0.75) {
        return `linear-gradient(-${90 -((percentage-0.5)/0.25)*90}deg, ${secondaryColor} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, ${secondaryColor} 50%, ${mainColor} 50%, ${mainColor})`

    } else if (percentage > 0.75 && percentage <= 1) {
        return `linear-gradient(${90 * (percentage / 0.25) - 270}deg, ${secondaryColor} 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)), linear-gradient(270deg, ${secondaryColor} 50%, ${mainColor} 50%, ${mainColor})`
    }


};