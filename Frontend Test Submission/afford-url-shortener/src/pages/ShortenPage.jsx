import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import { logEvent } from "../logging/logger";
import axios from "axios";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMi1tLTE2NjRAcmF5YXRiYWhyYXVuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxOTU1MDgwLCJpYXQiOjE3NTE5NTQxODAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlZjk0Njg4Zi1mYzBlLTQ3MzQtYjlhZS0zNTUwMjNjYzhmYzQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaCBkZXYiLCJzdWIiOiJhMjY0YzgwMy0yODRhLTQ5ZWYtYWM3Mi1mNmRhNzk0NWU0ZWQifSwiZW1haWwiOiIyMi1tLTE2NjRAcmF5YXRiYWhyYXVuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImhhcnNoIGRldiIsInJvbGxObyI6IjIyMDEwMDMxNDYiLCJhY2Nlc3NDb2RlIjoiQ0ZWYW1FIiwiY2xpZW50SUQiOiJhMjY0YzgwMy0yODRhLTQ5ZWYtYWM3Mi1mNmRhNzk0NWU0ZWQiLCJjbGllbnRTZWNyZXQiOiJUR0ZncGtoTmRyclVuSlV1In0.BlBlzfHU3h_85aAFgleVMwsaBOLp6ZHg4YaJMqvkvZw";

const ShortenPage = () => {
  const [inputs, setInputs] = useState([
    { longUrl: "", validity: "", shortcode: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const addRow = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { longUrl: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const newResults = [];

    for (let i = 0; i < inputs.length; i++) {
      const { longUrl, validity, shortcode } = inputs[i];

      // Client-side validation
      if (!longUrl.startsWith("http")) {
        alert(`Row ${i + 1}: Invalid URL`);
        await logEvent(
          "frontend",
          "error",
          "component",
          `Row ${i + 1}: Invalid URL`
        );
        continue;
      }

      const body = {
        url: longUrl,
        validity: validity ? parseInt(validity) : 30,
        shortcode: shortcode || undefined,
      };

      try {
        const res = await axios.post("/api/url", body, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        newResults.push({
          original: longUrl,
          short: res.data.shortUrl,
          expiry: res.data.expiry,
        });
        await logEvent(
          "frontend",
          "info",
          "component",
          `Short URL created for Row ${i + 1}`
        );
      } catch (err) {
        alert(`Error in Row ${i + 1}: ${err.message}`);
        await logEvent(
          "frontend",
          "fatal",
          "component",
          `Error in Row ${i + 1}: ${err.message}`
        );
      }
    }

    setResults(newResults);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 4 }}>
        🔗 URL Shortener
      </Typography>

      <Grid container spacing={2}>
        {inputs.map((input, index) => (
          <Grid key={index} xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Row {index + 1}</Typography>
              <TextField
                fullWidth
                label="Long URL"
                value={input.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="Validity (minutes)"
                value={input.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
                sx={{ my: 1 }}
              />
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={input.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
                sx={{ my: 1 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={addRow} disabled={inputs.length >= 5}>
          ➕ Add URL
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          🚀 Shorten URLs
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" gutterBottom>
            ✅ Results
          </Typography>
          {results.map((result, i) => (
            <Paper sx={{ p: 2, mb: 2 }} key={i}>
              <Typography>🔗 Original: {result.original}</Typography>
              <Typography>
                🔍 Short:{" "}
                <a href={result.short} target="_blank" rel="noreferrer">
                  {result.short}
                </a>
              </Typography>
              <Typography>⏰ Expiry: {result.expiry}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ShortenPage;
