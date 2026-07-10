---
date: '2026-01-15'
title: 'Software Engineering Co-op'
company: 'United Electronic Industries, an AMETEK Company'
location: 'Norwood, MA'
range: 'January – June 2026'
url: 'https://www.ueidaq.com/'
---

#### Python UeiDaq Regression Testing

Automated Regression Testing Framework for **UEI**’s data acquisition (DAQ) and I/O boards.

- Designed **PyTest**-based regression framework integrating external plugins for HTML output reports and other testing functionality.
- Wrote tests for 20 UEI devices, including analog and digital I/O, and the **CAN** and **MIL-STD-1553** Avionics communication protocols.
- Replaced static device configuration with **network-based hardware discovery**, reducing setup time to under a minute and eliminating manual configuration errors.

##### Bug Discovery and Resolution

- Discovered and reported 30+ issues spanning software bugs, documentation inaccuracies, and other categories.
- Fixed 15+ customer and internally-reported issues across UEI’s **C**, **C++**, and **Python** APIs.

##### SWIG Wrapping Refactor

- Refactored the **SWIG** rules responsible for wrapping UEI’s C++ API to generate its Python API.
- Addressed compatibility issues with new NumPy 2.x support for UEI’s Python API.
