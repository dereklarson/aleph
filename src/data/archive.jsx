const shapes = {
      diamond: {
        uid: 'diamond',
        type: 'shape',
        text: `{"backgroundColor": "transparent",
        "borderRadius": "0",
        "height": "0px",
        "width": "0px",
        "top": "-50px",
        "position": "relative",
        "border": "50px solid transparent",
        "borderBottom": "80px solid red",
        "'&::after'": {
          "height": "0px",
          "width": "0px",
          "content": "''",
          "position": "absolute",
          "border": "50px solid transparent",
          "borderTop": "70px solid red",
          "top": "70px",
          "left": "-50px"
        }
      }`,
      },
      pointer: {
        uid: 'pointer',
        type: 'shape',
        text: `{"backgroundColor": "red",
        "borderRadius": "0",
      "width": "80px",
      "height": "20px",
      "position": "relative",
      "&::after": {
        "content": "",
        "position": "absolute",
        "left": "0",
        "bottom": "0",
        "width": "0",
        "height": "0",
        "borderLeft": "20px solid white",
        "borderTop": "20px solid transparent",
        "borderBottom": "20px solid transparent"
      },
      "&::before": {
        "content": "",
        "position": "absolute",
        "right": "-20px",
        "bottom": "0",
        "width": "0",
        "height": "0",
        "borderLeft": "20px solid red",
        "borderTop": "20px solid transparent",
        "borderBottom": "20px solid transparent"
      }
    }`,
      },
}
