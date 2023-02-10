import React from "react";
import ReactDOM from "react-dom";
import { FixedSizeList as List } from "react-window";
import { Grid, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import "./styles.css";
const itemNumber = 3;
const lists = [...Array(300).keys()];
const useStyles = makeStyles(theme => ({
  gridItem: {
    width: "100%",
    height: "100%",
    backgroundImage: "#fff",
    border: `1px solid ${theme.palette.grey[400]}`,
    boxShadow: theme.shadows[1],
    borderRadius: "10px",
    "&:hover": {
      transition: "all .3s",
      border: `1px solid ${theme.palette.grey[500]}`,
      boxShadow: theme.shadows[3]
    }
  }
}));

const MultipleItemsCount = () => {
  const list = React.useRef(null);
  console.log(list);
  const onScroll = React.useCallback(({ scrollTop }) => {
    list.current.scrollTo(scrollTop);
  }, []);

  const MultiRows = ({ index, style }) => {
    const classes = useStyles();
    const renderItems = [];

    for (var i = index * 3; i < index * 3 + 3; i++) {
      if (lists[i] !== undefined) {
        renderItems.push(
          <Grid
            item
            xs={4}
            style={{ boxSizing: "border-box", padding: "16px" }}
          >
            <Card variant="outlined" className={classes.gridItem}>
              <Typography>card</Typography>
            </Card>
          </Grid>
        );
      }
    }
    return (
      <Grid container style={style}>
        {renderItems}
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <div>
        <p>hello</p>
      </div>
      <div>
        <Typography>Section</Typography>
        <List
          ref={list}
          className="List"
          height={window.innerHeight}
          itemCount={lists.length / itemNumber}
          itemSize={160}
          width="100%"
        >
          {MultiRows}
        </List>
      </div>
    </React.Fragment>
  );
};

ReactDOM.render(<MultipleItemsCount />, document.getElementById("root"));