const addUniversWithStyle = (pageId) => {
  const elementId = "MyTextBox_01";
  const dimension = {
    magnitude: 3000000,
    unit: "EMU",
  };
  return (
    {
      createShape: {
        objectId: elementId,
        shapeType: "TEXT_BOX",
        elementProperties: {
          pageObjectId: pageId,
          size: {
            height: dimension,
            width: dimension,
          },
          transform: {
            scaleX: 0.8976,
            scaleY: 0.1385,
            translateX: 528637.5,
            translateY: 3231425,
            unit: "EMU",
          },
        },
      },
    },
    // Insert text into the box, using the supplied element ID.
    {
      insertText: {
        objectId: elementId,
        insertionIndex: 0,
        text: "UNIVERS",
      },
    },
    {
      updateTextStyle: {
        // add style to the univers title
        objectId,
        style: {
          underline: false,
          fontFamily: "Nunito",
          fontSize: {
            magnitude: 15,
            unit: "PT",
          },
          weightedFontFamily: { fontFamily: "Nunito", weight: 600 },
          foregroundColor: {
            opaqueColor: {
              rgbColor: {
                red: 0.93333334,
                green: 0.13333334,
                blue: 0.21960784,
              },
            },
          },
        },
      },
    },
    {
      // center the Univers Title
      updateParagraphStyle: {
        objectId,
        style: {
          alignment: "CENTER",
        },
        fields: "alignment",
      },
    }
  );
};

module.exports = {
  addUniversWithStyle,
};
