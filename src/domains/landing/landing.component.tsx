import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import desktopIcon from "../../SVG/desktop.svg";
import emailIcon from "../../SVG/email.svg";
import tvIcon from "../../SVG/tv.svg";
import multiIcon from "../../SVG/multi.svg";
import switchIcon from "../../SVG/switch.svg";

import data from "./data.json";

const FOUR = 4;

const styles = {
  container: { marginLeft: "auto", marginRight: "auto", maxWidth: 1000 },
  section: { height: "60vh", alignContent: "center", display: "flex" },
};

interface Question {
  answer: string;
  question: string;
}

const LandingComponent: React.FC = () => (
  <Grid container justifyContent="center" sx={styles.container}>
    <Helmet>
      <title>Share your Clipps, without the hassle.</title>
      <meta name="description" content="Share your Clipps, without the hassle." />
    </Helmet>

    <Grid item container spacing={FOUR} sx={styles.section}>
      <Grid item xs={12} md={6} justifyContent="center" display="flex" direction="column">
        <Typography variant="h2">
          Share your <b>Clipps</b>,
        </Typography>
        <Typography variant="h3">without the hassle.</Typography>
      </Grid>
      <Grid item xs={12} md={6} justifyContent="center" display="flex" direction="row">
        <img src={desktopIcon} alt="desktop playing a clipp" width={400} />
      </Grid>
    </Grid>

    <Grid item container spacing={FOUR} xs={8} sx={styles.section}>
      <Grid item xs={12} md={8}>
        <Typography variant="h4" mb={2}>
          Request an invite
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12} md={4} textAlign="center">
        <img src={emailIcon} alt="request and invite graphic" width={200} />
      </Grid>
    </Grid>

    <Grid item container spacing={FOUR} sx={styles.section}>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={multiIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          1000MB of cloud storage
        </Typography>
      </Grid>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={tvIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          Unlimited views
        </Typography>
      </Grid>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={switchIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          Sharing kill switch,
        </Typography>
        <Typography variant="h5">account &amp; video level</Typography>
      </Grid>
    </Grid>

    <Grid item xs={8} sx={styles.section}>
      <Box>
        <Typography variant="h4" mb={4}>
          F.A.Q.
        </Typography>

        {data.faq.map(({ question, answer }: Question) => (
          <Accordion key={question} variant="outlined">
            <AccordionSummary>
              <Typography>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Grid>
  </Grid>
);

export const Landing = memo(LandingComponent);
