import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionStyled = styled((props) => <Accordion {...props} />)(
  ({ theme }) => ({
    backgroundColor: "#919191",
  })
);
const AccordionSummaryStyled = styled((props) => (
  <AccordionSummary expandIcon={<ExpandMoreIcon />} {...props} />
))(({ theme }) => ({
  backgroundColor: "#919191",
  textEmphasisColor: "white",
}));
const AccordionDetailsStyled = styled((props) => (
  <AccordionDetails {...props} />
))(({ theme }) => ({
  backgroundColor: "#ccc",
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };
