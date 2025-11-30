---
layout: page
title: "Work Experience"
icon: fas fa-briefcase
order: 1
---

<!-- Styling -->
<style>
  .work-history-table {
    background: transparent;
    border: none;
    border-collapse: collapse;
  }
  .work-history-table td {
    background: transparent !important;
    border: none;
    padding: 10px 50px 2px 0 !important;
    line-height: 1.4;
  }
  .work-history-table tr {
    background: transparent !important;
  }
  .collapsible-point {
    margin: 0.1rem 0 0.2rem 1.35rem;
  }
  .collapsible-point summary {
    list-style: none;
    cursor: pointer;
    font-weight: 400;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    padding: 2px 0;
  }
  .collapsible-point summary strong {
    font-weight: 400;
    transition: font-weight 0.15s ease;
  }
  .collapsible-point[open] summary strong {
    font-weight: 700;
  }
  .collapsible-point summary::-webkit-details-marker {
    display: none;
  }
  .collapsible-point summary::before {
    content: '\25B6';
    font-size: 0.85rem;
    margin-right: 0.15rem;
    transition: transform 0.2s ease;
  }
  .collapsible-point[open] summary::before {
    content: '\25BC';
  }
  .collapsible-point__preview {
    color: var(--text-color, #666666);
    font-weight: 400;
    font-size: 0.9em;
  }
  .collapsible-point[open] .collapsible-point__preview {
    display: none;
  }
  .collapsible-point__content {
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
  }
  .collapsible-point__content ul,
  .collapsible-point__content div {
    margin: 0;
  }
</style>


# Qure.ai


<!-- Calculate number of months passed in current title -->
{% assign current_time = site.time | date: '%s' %}
{% assign target_time = '2024-04-01' | date: '%s' %} 
{% assign seconds_since = current_time | minus: target_time %}
{% assign days_since = seconds_since | divided_by: 60 | divided_by: 60 | divided_by: 24 %}
{% assign years_since = days_since | divided_by: 365 %} 
{% assign remaining_days = days_since | modulo: 365 %}
{% assign months_since = remaining_days | divided_by: 30 %}

<!-- Show Qure.ai title history -->
### Title History
<table class="work-history-table">
  <tr>
    <td>Senior AI Scientist</td>
    <td>Level 3</td>
    <td><i class="fas fa-calendar"></i> &nbsp; Apr 2024 - Present</td>
    <td><i class="fas fa-clock"></i> &nbsp; {{ years_since }} {% if years_since < 2 %}year{% else %}years{% endif %} {{ months_since }} months</td>
  </tr>
  <tr>
    <td>AI Scientist</td>
    <td>Level 2</td>
    <td><i class="fas fa-calendar"></i> &nbsp; Jul 2022 - Mar 2024</td>
    <td><i class="fas fa-clock"></i> &nbsp; 1 year 9 months</td>
  </tr>
  <tr>
    <td>AI Scientist</td>
    <td>Internship</td>
    <td><i class="fas fa-calendar"></i> &nbsp; Jul 2021 - Jun 2022</td>
    <td><i class="fas fa-clock"></i> &nbsp; 1 year</td>
  </tr>
</table>

### Overview
Responsibility


### Projects


#### #) Data & Annotations
**Summary:** Own the data acquisition, curation, and annotation programs for two CT-first, multimodal products, safeguarding **30+ TB** of vendor, research, and client data (arriving via S3 buckets, other cloud shares, and literal hard-drive shipments) while transforming every raw submission into a **standardized, analysis-ready corpus**. Built an end-to-end operating model—from ingestion and metadata modeling to annotation orchestration and QA—that keeps R&D unblocked, gives product teams instant visibility into data readiness, and sustains high annotator satisfaction even as volume exploded.

<details class="collapsible-point">
  <summary><strong>Scope &amp; Data Governance</strong>: <span class="collapsible-point__preview">30+ TB, multi-modality, compliance-ready</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Manage several terabytes (30+ TB) of training, validation, and testing data spanning CT, CTA, perfusion, X-ray, PET-CT, biopsy, and hybrid patient datapoints sourced from vendors, open datasets, research collaborators, and both prospective and live clients—regardless of whether the drop arrives through S3/GCS/Azure shares, secure FTP, or encrypted hard drives.
  - Ingest unstructured deliveries, normalize them into a universal folder/schema layout, and capture every metadata field in strongly-typed BSON documents with canonical naming so downstream teams can query any cohort without spelunking raw disks.
  - Run automated integrity checks (modality compliance, DICOM completeness, scan contract specs, corruption and duplication detection) before a study is accepted, and log all results to a Postgres-driven ingestion tracker that ultimately publishes authoritative references into MongoDB.
  - Classify each DICOM series into modality / protocol buckets (non-contrast head CT, CTA, perfusion, etc.), tag their viable problem statements, and persist those tags in MongoDB for instant cohort filtering.
  - Cache frequently accessed scans as memory-efficient `safetensors` blobs, shrinking read latency by ~80% while staying within tight on-prem / cloud storage budgets.
  - Ensure every ingestion, transformation, and storage workflow adheres to the company’s multi-framework regulatory obligations for medical data handling, with audit-ready trails baked into the process definitions.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Annotation Operations</strong>: <span class="collapsible-point__preview">Taxonomy, tooling, validation</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Define per-problem taxonomies, sampling rules, and prioritization logic so every annotation batch directly advances a product hypothesis or research deliverable.
  - Authored upload/download automation for the RedBrick AI portal, including scripts that package imaging + metadata, push batches, and pull completed labels with version tracking.
  - Built validation daemons that inspect coverage immediately after each datapoint is annotated, flagging incompleteness or schema drift in near real time and driving re-annotation rates to ~0%.
  - Process downloaded annotations into lightweight, queryable stores with fast filtering (e.g., by modality, labeler, abnormality) so model training pipelines can materialize cohorts without manual wrangling.
  - Developed NLP + LLM parsing utilities powered by a stack of proprietary models, GPT, Gemini, and self-hosted Qwen instances to read radiology reports, extract hierarchical findings/attributes, and align them with structured tags to boost weak supervision and cohort triage.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Quality &amp; Issue Resolution</strong>: <span class="collapsible-point__preview">Concordance-first workflows</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Partnered with product POCs (who manage annotator contracts) to codify escalation paths so R&D only intervenes for nuanced clinical clarifications while still getting rapid answers.
  - Tackled ambiguous problem statements by rolling out secondary review passes, consensus templates, and label-specific heuristics that maximize usable signal despite inherent reader variability.
  - Maintained structured QC logs that correlate annotator performance, modality difficulty, and downstream model impact, ensuring noisy labels are filtered or reweighted before training.
  - Increased annotator satisfaction (surveyed by the product team) by giving them clearer instructions, tighter taxonomies, and faster tooling.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Team Leadership &amp; Collaboration</strong>: <span class="collapsible-point__preview">Scaling via playbooks</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - After bootstrapping the system, recruited, trained, and now supervise three data engineers who run day-to-day ingestion and annotation ops, each capable of adapting the framework to new client quirks or modalities.
  - Provide KT packets, SOPs, and shadowing sessions so engineers can troubleshoot vendor datasets independently while still escalating blocking edge cases to me.
  - Coordinate with the broader product, BI, and engineering orgs for capacity planning, security reviews, and audit readiness.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Impact</strong>: <span class="collapsible-point__preview">Throughput, latency, satisfaction</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Achieved a raw **18× increase in annotation throughput**; even after normalizing for 3× higher label demand and a 2× larger annotator pool, per-annotator productivity still improved ~3×.
  - Validation scripts cut re-annotation loops to nearly 0%, freeing annotators to focus on net-new data instead of fixes.
  - Safetensor caching reduced data access time by ~80%, enabling near-immediate fulfillment of ad-hoc analysis and training-data requests.
  - Maintained annotation quality at previous baselines despite much higher volume, while overall turnaround for data/annotation analysis requests dropped sharply thanks to the trained three-person team (qualitatively observed by stakeholders).
  </div>
</details>


<!-- 
Just like we filled in "Production Codebase", let us now fill in "Data & Annotations". This website will mostly be visited by recruiters and colleagues, so write it accordingly. There is a separete resume that I am providing to recruiters where I will only include the main points concisely, so there are no such restrictions here, be as verbose as you would like. Make it professional and unambiguous while appealing to recruiters (i.e. HR as well as tech folks). I am in-charge of the data and annotations of two products, both primarily based on CT scans, but multimodal also in some cases (eg. xray+ct+petct+biopsy patient datapoints)
- Managing several TBs (at least 30TB) of training, validation, and testing data sourced from vendors, open-source datasets, research study collaborations, and potential and onboarded clients.
- This invoves acquiring this data in unstructured format from the source, structuring it into a standardized universal format that is liberal as well as absolute for all data, reading all metadata into structured and standardized bson format, checking for corrupted or duplicated data as well as ensuring data specifications match contract agreement, uploading all metadata bsons using postgresql to a mongodb server which houses information and references to entire data bank, processing data to classify dicom series into different types of modalities and usecases (eg. non-contrast ct scans, ct angiography, ct perfusion, etc.), identifying usable series based on problem statements, storing this information on mongodb too, caching these particular scans as safetensors for fast access and easy storage, parsing reports using NLP and LLMs to identify hierarchial tags and abnormalities with their features, using this information to solve problem statements.
- Set up a process to identify datapoints for annotations based on product and research requirements, formulate the taxonomy (i.e. what needs to be labelled), set up upload and download scripts to the annotation portal (Redbrick AI), create validation scripts that periodically check annotation completeness after every datapoint is annotated, process downloaded annotations, created scripts for quality checks, store annotations in a structured format that is fast access and can be easily filtered to get the datapoints we need to train our models. These annotations are primarily used in training and evaluating models.
- Annotators were sourced by the product team. The product team POC is responsible for direct communication with the annotators and R&D team i.e. we only step in if we have doubts that need to be solved by the annotator directly.
- After setting up these processes, trained, supervising and managing a team of three data engineers to continue this for all upcoming datasets and annotations (often each have different requirements and therefore they were trained to be versatile in their thinking and problem solving).
- Issues were faced with annotation quality as labels for certain problem statements can be ambiguous and subject to reader. In such cases, came up with solutions to maximize usability of annotations by increasing concordance and minimizing noise as much as possible.
- This was mostly done from scratch so there is not much to compare it to (ie. improvements etc.). The method we used previously was very basic and is not really a good comparison with what has been setup now. With the new method, annotator satisfaction at least tripled, annotation throughput increased 18x (annotation requirement increased 3x, num of annotators increased 2x, so normalized increase in throughput would be 18/6x), annotation quality more or less remained the same, validation scripts decreased re-annotation instances to almost 0% as they are now checked on the fly, access time of datapoints decreased by ~80% because of safetensors usage, turnaround times for data and annotation relates analyses requests is now down (unmeasured) as there is a trained team of three.

Ask me relevant questions to improve upon this as I may have forgotten certain tools or ideas that I may have used. If you ask me some commonly used tools that one may use for this I can tell you so that you can update this. Also, feel free to modify the structure of the project so it's better to read.

 -->


#### #) Production Codebase
**Summary:** Architected and own a production‑grade AI pipeline framework for head CT/CTA/MRI triage that reduced turnaround time by **57%**, increased automated test coverage from **22% → 91%**, cut new‑model integration time from **~8 days → ~1 day**, and dropped configuration errors from **~700/year → 0/year** along with processing errors from **~500/year → 2/year**.


<details class="collapsible-point">
  <summary><strong>Ownership &amp; Scope</strong>: <span class="collapsible-point__preview">Hybrid deployments, resource-aware, 2k scans/mo</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Lead and own the end‑to‑end AI production codebase for the neuro‑imaging triage product, covering head CT, CTA, and MRI across on‑prem, cloud, and hybrid deployments.
  - Designed the system to operate reliably under CPU/GPU constraints (e.g., production on AWS `g4dn.4xlarge` with limited GPU and RAM), adding failsafes so models continue to run gracefully even under resource pressure.
  - Support ~2,000 valid series per month through this pipeline while maintaining strict reliability and performance guarantees.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Architecture &amp; Implementation</strong>: <span class="collapsible-point__preview">Modular TorchScript graph pipelines</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Designed and implemented the entire Python codebase from scratch, building a modular, fault‑tolerant pipeline framework that decouples TorchScript‑serialized models per CT/CTA study, each with its own preprocessing, postprocessing, and multi‑level collation stages.
  - Introduced a custom process‑graph / conditional‑subgraph abstraction with node‑level logging, benchmarking, and multiprocessing, allowing independent steps to run in parallel, with clear failure tracebacks and automatic merging of longest‑common‑prefix graphs to deduplicate shared processing.
  - Ensured backward compatibility so existing models and legacy pipelines continue to run unchanged, while new models can be plugged into the same modular framework without disrupting production.
  - Implemented output caching and database‑backed persistence for intermediate and final results, keeping outputs serializable and memory‑efficient to respect RAM limits on large CT scans.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Configuration Management &amp; Safety</strong>: <span class="collapsible-point__preview">Nested Pydantic configs, backward compatible</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Architected a nested Pydantic‑based client‑configuration schema that strictly validates model selection, thresholds, routing, and reporting rules, making it effectively impossible to persist invalid configurations in the database.
  - Migrated all existing client configs into the new structure, validating them and enforcing a standardized, modular config format where all clients share a common base schema plus optional, explicit customizations.
  - Passed model outputs at every collation stage through Pydantic model classes as an additional safety and consistency check, even though the code path already guarantees correct types in 99.99% of cases.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Quality, Testing, and Tooling</strong>: <span class="collapsible-point__preview">2k+ tests, enforced pre-commit + CI</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Built >2,000 unit and integration tests using pytest (with parameterization), including end‑to‑end tests for every model pipeline on real data and collation‑level tests on real outputs, raising coverage from 22% to 91%.
  - Enforced a high‑quality development workflow with Black, isort, Flake8, and pyupgrade, all wired into pre‑commit hooks so every contributor follows the same style and linting rules.
  - Integrated with GitHub Actions (for CODEOWNERS and review ownership of the R&D code) and Jenkins (for build, test, and deployment pipelines managed by engineering), and worked with QA/engineering teams who run additional regression and golden‑case tests before productizing new models.
  - Documented the codebase with Google‑style docstrings, type hints, and graph visualizations of the processing pipelines to make behavior transparent for both engineers and non‑R&D stakeholders.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Reliability, Monitoring, and Impact</strong>: <span class="collapsible-point__preview">Resource benchmarking, Slack alerts, < 2 incidents</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Performed extensive benchmarking under multiprocessing to ensure that total CPU, GPU, and RAM usage stays within safe limits; added failsafes and graceful‑degradation paths for resource‑related failures.
  - Enabled Slack‑based alerting (implemented with the engineering and business‑integrations teams) for errors, weekly volume metrics, and other key product KPIs.
  - Reduced end‑to‑end CT/CTA turnaround time by 57%, cut new‑model integration time from ~8 days to ~1 day, and achieved zero configuration‑related failures with only two processing‑pipeline issues in two years, both resolved in ≤2 days (vs. ~14 days previously).
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Collaboration &amp; Leadership</strong>: <span class="collapsible-point__preview">Sole R&D owner → mentor, cross-org standards</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Served as the sole R&D owner for the production pipeline, then transitioned into a mentorship and review role after knowledge transfer, as additional engineers began contributing to the codebase.
  - Standardized pre‑commit and testing practices for all technical contributors working on this product, driving a company‑wide uplift in code quality for this area.
  - Collaborated closely with the product’s engineering lead, core engineering team, and business‑integrations team to align interfaces, deployment strategy, monitoring, and operational processes.
  </div>
</details>


<!-- Prompt:
Fill in the production codebase section based on the following information. This website will mostly be visited by recruiters and colleagues, so write it accordingly. There is a separete resume that I am providing to recruiters where I will only include the main points concisely, so there are no such restrictions here, be as verbose as you would like. Make it professional and unambiguous while appealing to recruiters (i.e. HR as well as tech folks).
I am in-charge of the production codebase for my product which involves the following:
- The product takes in head ct, cta, or mri scan. if it is a ct or cta, it is processed by at least 10 different models, each with their own preprocessing steps, the outputs are postprocessed, collated at multiple levels, and a final result json is created. This is passed on to the enngineering team and their codebase to generate output assets and display to the end user. If it is mri, engineering team handles it directly as this has to be forwarded ot a third party (outside the company for processing). The set of models to use, the thresholds, what to report, etc, is all managed by a client config which is also managed by me.
- I wrote the entire code from scratch. Reasons to do this were: decouple all models such that errors in one do not cause trouble for others. make client config management thorough and unforgiving so that incorrect configs cannot even be created, removing all risk of incorrect client configs being saved in the database. make code debugging super simple. make code future proof as adding new pieces of code is extremely easy. extensive unit testing and integration testing. reducing turn around time of entire workflow.
- models were serialized using torchscript. this was done to make models extremely efficient and less dependent on external libraries.
- I created my own data structure involving process graphs and conditional subgraphs which allowed for versatile graph creations based on the clinent config. Additional logging and benchmarking was added to each of the nodes in the graph. Multiprocessing was also added to the graph so that independent processes can run in parallel making this data structure very efficient. Graphs were made such that in case of a failure point, appropriate errors were raised with a complete traceback and reason to make debugging straightforward. THis was also done to make code modular as every processing step could then be made into a process and could be shared across model pipelines. Longest common prefix graphs of multiple model pipelines are merged into one to deduplicate processing. Added visualization of these graphs too to easily understand the processing path that any model takes from input to output.
- Used a multiple nested model structure using pydantic for client config management with extensive checking to make it impossible to create invalid configs. This ensured that code cannot fail due to config errors
- over 2000 unit tests were added using pytest and parameterization. Every model pipeline was tested end-to-end separately on 2 real data points. Similarly, output collation was tested at all levels on 2 real data points.
- everything was extensively documented using google style docstrings. all variables were provided with type hints.
- black is enforced for consistent formatting. isort is used for consistent imports order. flake8 is used for linting and all errors are resolved continuously. pyupgrade is used to keep syntax up to date. all of this has been added to pre-commit hooks to ensure that all who work on this and will work on this will follow the same structure making code highly readable and consistent.
- turn around time was reduced by 57%
- 0 config errors have occurent since then
- only 2 processing errors have occured since (in 2 years)
- new model integration time was reduced from 8 days to 1 day
- code testing coverage was increased from 22% to 91%.
- worked with engineering team colleague and head of this product for this. I was solely responsible for this project from R&D.


---


The current rendering of this is very verbose (as per the image), format it better so that it doesn't look like big paragraphs. You can convert it to a point-list if required, where each point is a sentence or two.
Make the key terms and phrases bold.
From the list you have provided, we use several tools, but most are managed by the engineering team.
This was used for all, on-prem, cloud, and hybrid deployments. It was designed to work for all.
I had to account for GPU and CPU limitations. Production uses only `g4dn.4xlarge` aws server which doesn't have a very robust gpu setup. failsafes were added to ensure that models woudld still run in case of these errors. RAM was also limited which was a challenge for this product as ct scans are large and we can easily run out of memory. extensive benchmarking was done with multiprocessing enabled to ensure that there is never too much load on the servers and appropriate failsafes were added. Additionally, process outputs were cached and saved int he database, so I ensured that outputs are serializable and memory efficient.
All code was made backward compatible. Also, any old models could not easily be discarded with the new modularized code whereas previously there was no method to do this.
All cliet configs were validated with the new structure and were migrated along with the release of this new codebase.
Configs were also modularized and formatted such that all clients follow a fixed config with the addition of any customizations if specified.
Model outputs at each stage of data collation were also passed through pydantic model class objects ensuring cosistency and passing all tests. These were added as safety checks even though it was know that it will pass 99.99% of the times with the way the code was written.
Slack alerts were added by the engineering team in cases of errors. Additional weekly slack alerts were added by the business integrations team to track the number of scans processed and other metrics.
Very few examples where error handling made a production incident easier to resolve as codebase was written to be fault safe. Errors that arose were resolved within 2 days (compared to 14 days before).
regression tests were done by the engineering and qa qc teams
Used github actions to manage codeowners file, where I am responsible for the RND code. Jenkins is used to test and deploy the build which is also managed by the engineering team
golden test cases have been created are tested internally before productization of a model, not after.
We use clearml for experiment tracking but that is not relevant to this as this is only code productization and deployment.
We process about 2000 valid series using this pipeline every month.
After this, I have only mentored and reviewed code for this. The rest of the team has been given KT and are the contributors for this. I have rarely had to step in. Standardizing pre commit and testing was my initative for all tech folks in the company working on this product.

 -->



#### #) Multi-class Classification & Semantic Segmentation
- Task:
- Method: 
- Impact: 
- Collaboration: 

#### #) Generative Models
- Task:
- Method: 
- Impact: 
- Collaboration: 

#### #) 3D Foundation Models
- Task:
- Method: 
- Impact: 
- Collaboration: 

#### #) Architecture Implementations
- Task:
- Method: 
- Impact: 
- Collaboration: 


### Publications
- Link to [All Publications]({{ site.baseurl }}{% link _tabs/publications.md %})
- Link to [Blog]({{ site.baseurl }}{% link _tabs/blog.md %})