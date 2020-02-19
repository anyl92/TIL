import React , {useState, useEffect} from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from "@material-ui/core/Toolbar";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 200,
    borderCollapse: "separate",
    width:'340px',
  },
  authorImg: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  title: {
    flexGrow: 1
  },
  gooes: {
    maxWidth: 30,
    maxHeight: 30
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#ffd369"
    }
  },
}));

const useStylesSimpleGrow = makeStyles(theme => ({
  root: {
    // height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));


const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText("#ffbf00"),
    backgroundColor: "#ffd369",
    width: '30px',
    "&:hover": {
      // backgroundColor: "#fff1cf"
      backgroundColor: "#263f44",
      color: "white"
    }
  }
}))(Button);





export default function DenseTable(props) {
  const classes = useStyles();
  const classesSimpleGrow = useStylesSimpleGrow();
  // const [rows, setRows] = useState(Array.from(props.rankingdata));

  let handleClick = (href) => {
    return (event) => {
      console.log(`Href: ${href}.`);
    }
  };

    return (
      <div className={classesSimpleGrow.root}>
        <div style={{padding : '10px 20px 10px 20px', border : '1px solid', margin:'10px'}}>
        
        <Grow in={true}>
              {/* <Paper elevation={4} className={classesSimpleGrow.paper}> */}
              <svg className={classes.svg}>
                <polygon className={classes.polygon}>
          
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton> */}
            <img
              className={classes.gooes}
              src={props.titleImg}
              // src="https://cdn.pixabay.com/photo/2012/04/16/13/55/silhouette-36087_960_720.png"
              alt=""
              style={{maxHeight: '50px', maxWidth: '50px'}}
            />
            <Typography variant="h6" className={classes.title} style={{fontFamily:'S-CoreDream-8Heavy'}}>
              {props.title}
            </Typography>
            {/* <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
              size="small"
            >
              <ColorButton>W</ColorButton>
              <ColorButton>M</ColorButton>
              <ColorButton>Y</ColorButton>
            </ButtonGroup> */}
          </Toolbar>
          {/* <TableContainer component={Paper}> */}
          
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableBody style={{width:'340px'}}>
              {Array.from(props.rankingdata).map(row => (
                <TableRow className={classes.tableRow} key={row.sunwi} onClick={handleClick(row.href)}>
                  <TableCell align="center" component="th" scope="row" padding='checkbox' fontFamily='NIXGONM-Vb'>
                    {row.sunwi}
                  </TableCell>
                  <TableCell align="right" padding='checkbox'>
                    <img className={classes.authorImg} src={row.img} alt="" style={{margin:'15px'}}/>
                  </TableCell>
                  <TableCell align="left" size='medium' padding='none' style={{fontFamily:'NIXGONM-Vb'}}>{row.title}</TableCell>
                  <TableCell align="right" padding='checkbox' style={{fontFamily:'NIXGONM-Vb'}}>{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </TableContainer> */}
          </polygon>
          </svg>
                {/* </Paper> */}
              </Grow>
        </div>
      </div>
    );
  }

//   return (
//     <div style={{padding : '10px 20px 10px 20px', border : '1px solid', margin:'10px'}}>
//       <SimpleGrow>
//       <Toolbar>
//         {/* <IconButton
//           edge="start"
//           className={classes.menuButton}
//           color="inherit"
//           aria-label="menu"
//         >
//           <MenuIcon />
//         </IconButton> */}
//         <img
//           className={classes.gooes}
//           src={props.titleImg}
//           // src="https://cdn.pixabay.com/photo/2012/04/16/13/55/silhouette-36087_960_720.png"
//           alt=""
//           style={{maxHeight: '50px', maxWidth: '50px'}}
//         />
//         <Typography variant="h6" className={classes.title} style={{fontFamily:'S-CoreDream-8Heavy'}}>
//           {props.title}
//         </Typography>
//         {/* <ButtonGroup
//           variant="contained"
//           color="primary"
//           aria-label="contained primary button group"
//           size="small"
//         >
//           <ColorButton>W</ColorButton>
//           <ColorButton>M</ColorButton>
//           <ColorButton>Y</ColorButton>
//         </ButtonGroup> */}
//       </Toolbar>
//       {/* <TableContainer component={Paper}> */}
//         <Table
//           className={classes.table}
//           size="small"
//           aria-label="a dense table"
//         >
//           <TableBody style={{width:'340px'}}>
//             {Array.from(props.rankingdata).map(row => (
//               <TableRow className={classes.tableRow} key={row.sunwi} onClick={handleClick(row.href)}>
//                 <TableCell align="center" component="th" scope="row" padding='checkbox' fontFamily='NIXGONM-Vb'>
//                   {row.sunwi}
//                 </TableCell>
//                 <TableCell align="right" padding='checkbox'>
//                   <img className={classes.authorImg} src={row.img} alt="" style={{margin:'15px'}}/>
//                 </TableCell>
//                 <TableCell align="left" size='medium' padding='none' style={{fontFamily:'NIXGONM-Vb'}}>{row.title}</TableCell>
//                 <TableCell align="right" padding='checkbox' style={{fontFamily:'NIXGONM-Vb'}}>{row.score}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       {/* </TableContainer> */}
//       </SimpleGrow>
//     </div>
//   );
