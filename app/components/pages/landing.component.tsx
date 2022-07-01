import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Link as MuiLink,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { PATHS } from "~/constants";
import desktopIcon from "~/svg/desktop.svg";
import emailIcon from "~/svg/email.svg";
import multiIcon from "~/svg/multi.svg";
import switchIcon from "~/svg/switch.svg";
import tvIcon from "~/svg/tv.svg";

const FOUR = 4;
const faq = [
  {
    question: "What file types are allowed?",
    answer:
      "MP4 video format 🎥. We're working on adding support for more formats.",
  },
  {
    question: "Why invitation only?",
    answer:
      "Video hosting is pricey 💸. We can't afford huge virtual space at the moment, so every megabyte counts. Apologies for the inconvenience.",
  },
  {
    question: "Can I pay to get more space?",
    answer: "We're working on it 💾. But we don't have an ETA yet.",
  },
  {
    question: "Where is my invite?",
    answer:
      "Invites can take up to 24hrs to be processed. Did you check your spam box? If you didn't receive it, we might ran out of available slots. We're working on having more capacity, thanks for your patience!",
  },
  {
    question: "How long do videos stay on Clipps?",
    answer:
      "We don't delete your clipps as long as you keep them away from your trash bin.",
  },
  {
    question: "Who can see my clipps?",
    answer:
      "All clipps are public by default. However, you can protect the access from the privacy settings.",
  },
  {
    question: "Do I have to install any additional tool?",
    answer:
      "Negative. A modern web browser (chrome, brave, safari, edge, firefox, etc.) with javascript enabled is enough.",
  },
  {
    question: "What if I want to report any content?",
    answer:
      "If you suspect that any content on Clipps is infringing upon a copyright that you own, please reach out to us at support@clipps.io.",
  },
];
const styles = {
  hero: {
    justifyContent: "center",
    paddingBottom: "5rem",
    paddingTop: "10rem",
  },
  section: { paddingBottom: "5rem", paddingTop: "5rem" },
  paper: { marginTop: "5em", padding: "2em", width: "100%" },
};

export const LandingPage = () => (
  <>
    <Grid container spacing={FOUR} sx={styles.hero}>
      <Grid item>
        <Typography variant="h2">
          Share your <b>Clipps</b>,
        </Typography>
        <Typography variant="h3" pb={4}>
          without the hassle.
        </Typography>
        <Typography pb={2}>
          Clipps is the easiest way to share short videos.
          <br />
          Join the community for free now!
        </Typography>
        <Button variant="contained">Join now</Button>
      </Grid>
      <Grid item>
        <img src={desktopIcon} alt="desktop playing a clipp" width={400} />
      </Grid>
    </Grid>

    <Grid container spacing={FOUR} sx={styles.section}>
      <Grid item xs={12}>
        <Typography variant="h4">Features</Typography>
        <Typography pb={4}>
          This is what makes us different from the others.
        </Typography>
      </Grid>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={multiIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          1000MB of cloud storage
        </Typography>
        <Typography pt={2}>
          {
            "Upload all the clipps you need, we don't limit the number of files you can store."
          }
        </Typography>
      </Grid>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={tvIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          Unlimited views
        </Typography>
        <Typography pt={2}>
          Share your clipps with everyone, everywhere.
        </Typography>
      </Grid>
      <Grid item xs={6} md={4} textAlign="center">
        <img src={switchIcon} alt="placeholder" height={120} />
        <Typography mt={2} variant="h5">
          Sharing kill switch,
          <br /> account &amp; video level
        </Typography>
        <Typography pt={2}>
          We provide you with privacy tools in case you need them.
        </Typography>
      </Grid>
    </Grid>

    <Grid container spacing={FOUR} sx={styles.section} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">Request an invite</Typography>
        <Typography>
          Early access is by invitation only. Request your invite today!
        </Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <Stack direction="row" spacing={4} alignItems="center">
          <Paper variant="outlined" sx={styles.paper}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <Button variant="contained">Request</Button>
            </Stack>
          </Paper>
          <img src={emailIcon} alt="request and invite graphic" width={200} />
        </Stack>
        <Typography pt={2}>
          Privacy concerns? Check our{" "}
          <MuiLink underline="hover" component={Link} to={PATHS.PRIVACY}>
            privacy policy
          </MuiLink>
        </Typography>
      </Grid>
    </Grid>

    <Grid container spacing={FOUR} sx={styles.section} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4">F.A.Q.</Typography>
        <Typography pb={2}>Frequently asked questions.</Typography>
      </Grid>
      <Grid item xs={10}>
        {faq.map(
          ({ question, answer }: { answer: string; question: string }) => (
            <Accordion key={question} variant="outlined">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          )
        )}
        <Typography pt={3}>
          Additional questions? Drop us an email at{" "}
          <MuiLink underline="hover" component={Link} to="" href={PATHS.MAILTO}>
            support@clipps.io
          </MuiLink>
          , our support team will reach out!
        </Typography>
      </Grid>
    </Grid>
  </>
);
