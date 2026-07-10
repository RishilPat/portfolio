---
date: '2025-01-15'
title: 'Hardware Interface Development Co-op'
company: 'E Ink Corporation'
location: 'Billerica, MA'
range: 'January – August 2025'
url: 'https://www.eink.com/'
---

#### Automated Visual Inspection System

Quality control system for high-volume E Ink panel inspection: catching defects and consistency issues before panels ship.

- Python-based capture and analysis of camera and lighting measurements
- PowerShell and Python scripts for offline installations (no network access on the factory floor)
- Prevented unauthorized modifications to the codebase by implementing a hashing system to verify code integrity. Git and other version control systems were not available.
- Implemented a GUI for technicians to easily view and analyze inspection results using PyQt6

##### Image processing and analysis

- Flat-field correction for uneven lighting
- Color reference adjustment using a linear regression model to match known color measurements
- ArUco marker detection for panel isolation and orientation using OpenCV
- QR code detection for panel identification

##### Results

- Enabled **100% panel inspection** and scalability to over **4 million units annually**, across 150+ colors per panel
- Relative accuracy: ~1.8 dE (smallest human-perceivable unit of color difference) vs. E Ink’s high-accuracy reference measurements
- Per manager's evaluation: _"Overall, Rishil's contributions have been quite remarkable compared to a range of different employees. His maturity and skill are a unique combination that is highly effective in the workplace."_

#### Lab instrument integration

- Wrote Python interfaces for spectrometers and other lab instruments
- Integrated with E Ink’s existing lab equipment and data analysis framework
