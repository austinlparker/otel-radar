# OpenTelemetry Technology Radar Rubric

> The OpenTelemetry Technology Radar is an opinionated guide on the maturity of various OpenTelemetry integrations and components. This document serves as a rubric for estimating the maturity of a component, as well as the necessary data format for communicating those maturity scores.

## Concepts and Facets

- A concept is a broad, logical, and meaningful collection of dimensions that relate to common components of a software system. Concepts can be very broad -- 'Database Monitoring' is a concept that can include not only log and metric analysis of raw database log files and statistics, but also query profiling and database client instrumentation.
- A facet is a specific thing that can be assigned to a concept. In our prior example, 'Query Profiling' is a facet of 'Database Monitoring'. 'JDBC Client Instrumentation' is also a facet of 'Database Monitoring'.
- Facets have tags, which can be used to filter facets.

## Maturity Scores

- Each facet will have a maturity score, which is a value between 0.0 - 1.0.
- The maturity score of a facet is qualitative, and is calculated from the following dimensions:
  - Developer Experience: How easy to use is this? Are there good examples? Is it frustrating or difficult to program with?
  - Documentation: Is documentation clear, concise, and easily accessible?
  - Completeness: Does this component emit multiple signals (traces, metrics, logs)? Does it use the appropriate semantic conventions?
- In addition, each facet has a confidence score, which is a value between 0.0 - 1.0.
- The confidence score is a measure of how sure we are about the maturity score, and is calculated from the following dimensions:
  - Real-world use: How many people are using this particular facet?
  - Sentiment: Do people that use it seem happy with it?

## Output Format

- Concepts should each be in their own JSON file, with the following structure:

```
{
  "id": <number>,
  "concept": "Example Concept",
  "description": "A brief description of the concept.",
  "dimensions": [
    {
      "id": <number>,
      "facet": "Facet Name",
      "maturity_score": <number>,
      "maturity_score_details: {
        "developer_experience_score": <number>,
        "documentation_score": <number>,
        "completeness_score": <number>
      },
      "confidence_score": <number>,
      "confidence_score_breakdown": {
        "real_world_score": <number>,
        "sentiment_score": <number>
      },
      "tags": ["tag1", "tag2"...],
      "description": "A brief description of the facet"
    },
}
```
