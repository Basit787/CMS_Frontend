import { Box, Card } from "@mui/material";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from "@mui/material/LinearProgress";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{ height: "25px", borderRadius: "20px" }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Syllabus = () => {
  const [progress, setProgress] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  const [selectedItems, setSelectedItems] = React.useState(0);

  //checkbox

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const handleCheckboxClick = (index, isChecked) => {
    if (isChecked) {
      setSelectedItems((prevSelected) => prevSelected + 1);
    } else {
      setSelectedItems((prevSelected) => prevSelected - 1);
    }
  };

  const calculateProgress = () => {
    if (totalItems > 0) {
      return (selectedItems / totalItems) * 100;
    }
    return 0;
  };

  const accordion = [
    /*
    Object Skeleton
  {
      heading: '',
      description: '',
      reference:''
    },

    */
    {
      heading: "An Introduction to JavaScript",
      description: "Let's have a basic introduction to JavaScript",
      reference: "https://javascript.info/intro",
    },
    {
      heading: "Code editors",
      description: "Lets understand what is code editor",
      reference: "https://javascript.info/code-editors",
    },
    {
      heading: "Variables",
      description: "What are variables in JS",
      reference: "https://javascript.info/variables",
    },
    {
      heading: "Data types",
      description: "Lets learn about Data types",
      reference: "https://javascript.info/types",
    },
    {
      heading: "Type Conversions",
      description: "What is type conversion? Lets get started...",
      reference: "https://javascript.info/type-conversions",
    },
    {
      heading: "Basic operators, maths",
      description: "lets get familiar with basic operators",
      reference: "https://javascript.info/operators",
    },
    {
      heading: "Conditional Statements",
      description: "Lets understand what is 'if','else if','else'",
      reference: "https://javascript.info/ifelse",
    },
    {
      heading: "Logical operators",
      description: `Lets understand what is || (OR), && (AND), ! (NOT), ?? (Nullish Coalescing)`,
      reference: "https://javascript.info/logical-operators",
    },
    {
      heading: "Loops: while and for",
      description: "Lets have some fun with loops...",
      reference: "https://javascript.info/while-for",
    },
    {
      heading: `The "switch" statement`,
      description: "Lets switch",
      reference: "https://javascript.info/switch",
    },
  ];

  React.useEffect(() => {
    setTotalItems(accordion.length);
  }, [accordion]);

  React.useEffect(() => {
    setProgress(calculateProgress());
  }, [selectedItems, totalItems]);
  return (
    <Box>
      <Box
        sx={{
          margin: "3%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      </Box>
      <Box>
        {accordion.map((item, index) => (
          <Card sx={{ display: "flex", marginBottom: "1.5px" }}>
            <Checkbox
              disableRipple={true}
              {...label}
              className="checkBox"
              onChange={(e) => handleCheckboxClick(index, e.target.checked)}
              sx={{ display: "flex", alignItems: "start" }}
            />
            <Accordion key={index} sx={{ width: "100%", boxShadow: "0" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.heading}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <h1>Description</h1>
                  {item.description}
                </Typography>
                <Typography>
                  <h1>Reference</h1>
                  <Link to={item.reference}>{item.reference}</Link>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Syllabus;
