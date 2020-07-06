const hitOptions = {
    // segments: true,
    stroke: true,
    bounds: true,
    // handles: true,
    // fill: true,
    tolerance: 2
    // match: this.matchFilter
}

$(function(){

    let canvasB = document.getElementById('mainCanvas');

    paper.install(window);
    paper.setup(canvasB);

    let rectangleX1 = 30;
    let rectangleY1 = 10;
    let rectangleX2 = 50;
    let rectangleY2 = 50;

    let fontSize = 12;
    let fontPadding = 2;
    let fontX1 = rectangleX1;
    let fontY1 = rectangleY1;

    let rectangle = new paper.Shape.Rectangle({
        from: [rectangleX1, rectangleY1],
        to: [rectangleX2, rectangleY2],
        strokeColor: new paper.Color('grey'),
        strokeWidth: 2,
    });

    let pointText = new paper.PointText({
        content: 'The contents of the point text',
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fillColor: 'black',
        fontSize: fontSize
    });

    // 上下左右のパターンで作成する
    if (rectangleY1 < fontSize) {
        fontY1 = rectangleY2 + fontSize + fontPadding;
        fontX1 = rectangleX1;
    }

    pointText.point = [fontX1, fontY1];

    new paper.Group([
        rectangle,
        pointText
    ]);

    let tool = new paper.Tool();

    tool.onMouseDown = function(event) {
        hitResult = paper.project.hitTest(event.point, hitOptions);

        // console.log(hitResult);
        console.log(hitResult);
        if (hitResult) {
            hitResult.item.selected = !hitResult.item.selected;

            path = new Path();
            path.add(event.point);
            path.strokeColor = 'black';
        }
    }

    tool.onMouseDrag = function(event) {
        // Add a point to the path every time the mouse is dragged
        path.add(event.point);
    }

    paper.view.draw();
});

