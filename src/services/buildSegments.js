export function buildSegments(points){
        const segments = [[]];

    points.forEach(point => {
        const currentSegment =
            segments[segments.length - 1];

        const lastPoint =
            currentSegment[
                currentSegment.length - 1
            ];

        if (lastPoint) {
            const deltaLng = Math.abs(
                point[1] - lastPoint[1]
            );

            if (deltaLng > 180) {
                segments.push([]);
            }
        }

        segments[
            segments.length - 1
        ].push(point);
    });

    return segments;
}