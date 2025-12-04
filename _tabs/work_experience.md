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
  .a[open] summary::before {
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
    <td>AI Scientist Intern</td>
    <td>Full-time (pre-grad)</td>
    <td><i class="fas fa-calendar"></i> &nbsp; Jul 2021 - Jun 2022</td>
    <td><i class="fas fa-clock"></i> &nbsp; 1 year</td>
  </tr>
</table>

### Overview
TODO


### Projects


#### #) Lung Cancer AI Platform (qCT)
**Summary:** Joined the lung-cancer initiative in 2024 to transplant my supervised computer-vision toolkit into a multimodal CT/PET pipeline, strengthening nodule characterization, detection research, and malignancy-risk modeling while mentoring junior scientists and keeping the product’s data health visible via automated observability hooks.
**Mission:** Help radiologists, pulmonologists, and thoracic surgeons surface clinically urgent nodules early—whether discovered on LDCT screening, PET/CT follow-ups, or incidental findings—and feed them consistent rankings, visualizations, and risk scores that accelerate reporting and patient routing.

<details class="collapsible-point">
  <summary><strong>Scope &amp; Tooling</strong>: <span class="collapsible-point__preview">CT-first remit, multimodal inputs</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Focus on the CT/PET portion of the platform while sister teams specialize on X-ray-first screening; collaborate on shared annotations and cross-modality heuristics so nodules discovered on X-ray can be traced on CT follow-ups.
  - Curated ~22k labeled nodules with multiple reads for characteristic classification, ~27k LDCT nodules for detection research, and continue to expand with CT/PET-CT pairs, biopsy notes, and longitudinal CT reports for malignancy risk modeling.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Nodule Characteristics &amp; Ranking</strong>: <span class="collapsible-point__preview">Calcification AUC 0.97, spiculation 0.84</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Raised **calcification classification AUC from 0.93 → 0.97** (sensitivity/specificity 0.94/0.76 → 0.93/0.96) by cleaning the 22k-nodule dataset, smarter sampling of datapoints, Hu value heuristics, and using an inverse-frequency class-balanced cross entropy loss of my own making. Model is live in production.
  - Boosted **spiculation classification AUC from 0.80 → 0.84** (sensitivity/specificity 0.57/0.87 → 0.60/0.91) by treating it as a regression problem, introducing a context crop of better understanding of the presence of the abnormality, and using the same inverse-frequency class-balanced cross entropy loss as calcification. Model is live in production.
  <!-- - Investigated texture (solid / part-solid / ground-glass) classification; although accuracy parity wasn’t met, the work produced reusable labeling templates and calibration scripts for the next iteration once more data is collected. -->
  - Designed a ranking engine that scores nodules by clinical urgency using calcification, spiculation, texture, juxta-pleural/perifissural location, diameter, and volume; radiologists now rely on its ordered worklist during reporting sessions, noting markedly faster prioritization even without a historical baseline.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Detection Research &amp; Evaluation</strong>: <span class="collapsible-point__preview">DETR + Swin/ViT3D, custom 3D mAP</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Prototyped DETR and Deformable DETR pipelines with SwinV2-3D and ViT-3D backbones to replace the legacy RetinaNet detector, moving beyond the old precision/recall-only checks by implementing bespoke **3D mAP/mAR** metrics and IoU thresholds that respect anisotropic CT voxels.
  - Demonstrated that limited (27k) noisy LDCT annotations capped DETR’s gains, documenting the data/label gaps and handing the evaluation harness to the next cycle so the team can quickly re-test when scale improves.
  - Hardened the existing RetinaNet pipeline by backporting the new evaluation suite, giving product managers clearer launch criteria for newer models even though the DETR track was paused. <!-- Which means that the new mAP and mAR metric implementations were applied on the existing RetinaNet model to keep metrics tracking consistent so that we can compare new models easily. -->
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Emerging Models &amp; Multimodal Research</strong>: <span class="collapsible-point__preview">Gemini trials, malignancy score, PET/CT fusion</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Explored Gemini Pro via Portkey/OpenAI APIs to classify nodules and filter confounders directly from CT slice stacks; documented the modality mismatch (2D/video inputs vs. 3D HU volumes) and why the approach underperformed compared to the X-ray team’s success, saving future cycles.
  - Currently architecting a proprietary lung-nodule malignancy score that fuses PET-CT uptake patterns, CT morphometrics <!-- size and shape -->, biopsy outcomes, and longitudinal reports; work is under wraps until patents/publications land, but the data contracts, schemas, and training scaffolds are ready.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Visualization &amp; Monitoring</strong>: <span class="collapsible-point__preview">CT→X-ray projection, Grafana signals</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Adapted an internal CT-to-X-ray projection algorithm (using the efficiency of CUDA shared objects) to denoise scans, strip patient-table artifacts, and render realistic projections that highlight detected nodules for customer demos and follow-up planning.
  - Established a weekly Grafana-driven digest with product managers that surfaces client input distributions (scanner types, slice thickness, LDCT vs. diagnostic CT ratios) so product and data teams spot drift before it hits model performance.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Leadership &amp; Collaboration</strong>: <span class="collapsible-point__preview">Supervisory role, CT↔X-ray alignment</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Operate in a supervisory capacity, guiding junior scientists on experimentation hygiene, reviewing their PRs, and aligning CT-model deliverables with client commitments while X-ray peers tackle parallel milestones.
  - Partner with clinicians, product strategists, and the CT/PET-CT research pod to ensure every model spec maps to a real reporting constraint, whether that’s screening-camp throughput or early detection and management of lung cancer.
  </div>
</details>


<!-- Prompt:

Let's draft the Lung Cancer section. Just like before, this website will mostly be visited by recruiters and colleagues, so write it accordingly. There is a separete resume that I am providing to recruiters where I will only include the main points concisely, so there are no such restrictions here, be as verbose as you would like. Make it professional and unambiguous while appealing to recruiters (i.e. HR as well as tech folks). 
This is a project I joined recently (last year). It is quite different from my previous product (stroke) and works with multimodal data (X rays, chest ct scans and pet scans). The overarching goal is to assist radiologists in efficient reporting of lung nodules on chest ct scans, assist pulmonologists and thoracic surgeons in early detection of lung cancer patients at screening camps or finding them incidentally in x rays (which are the most commonly taken radiological modality) or in ct scans and then having regular follow ups. I work solely on the ct side of things with colleagues while a section of the team works solely on the xray side. 
- Trained nodule characteristics models. Increased nodule calcification classification AUC from 0.93 to 0.97. (sen spec increase from 0.94, 0.76 to 0.93, 0.96). Increased nodule spiculation classification AUC from 0.8 to 0.84 (sen spec increase from 0.57, 0.87 to 0.6, 0.91). These two models are currently in production. Trained a model to improve nodule texture classification too (i.e. solid part solid and ground glass) but the model did not improve on performance and therefore is not productized. Training data was 22k nodules.
- Trained a nodule detection model using DETR with SwinV23D/ViT3D backbones. Current pipeline uses RetinaNet to detect nodules. Implemented 3D versions of mAP and mAR for this. DETR, Deformable DETR did not give superior results because of lack of scale in data and noisy data. Training data was limited to 27k nodules, mostly on LDCT scans. This track was terminated.
- Created an algorithm on ranking nodules based on clinical importance given the nodule's size and certain characteristics. Nodule ranking achieved TODO metric. Since this was done for the first time there is no prior to compare to, however metrics are excellent with positive radiologist feedback. Characteristics include calcification spiculation texture juxtapleural perifissural diameter volume.
- Tried using Gemini pro 3 with openai api on portkey to build a nodule characteristics classification model. Gemini was unable to do well with all kinds of prompts and samples. Tried the same to differentiate between nodules and other confounders, similar results. Probably because Gemini is not well versed with CT scans, especially reading 3D scans is difficult and as it takes only 2D inputs or videos, providing 3D ct scans as videos or multiple images was not something it was ever expecting giving poor results. This approach worked decently well for the xray team which led us to explore this avenue.
- Worked on XRay projection given a CT scan to visualize the location of nodules in the lung to show to clients in the product. This involved denoising the ct scan, removing artifacts such as the bed, and then taking point projection of the CT scan to get a realistic xray. Algorithm was developed by another team but was adapted for this usecase by me. Worked with cuda shared object code for this. 
- Working more as a supervisory role in this product, guiding juniors to build new models while focusing on product strategy and niche models that require tight coupling with client expectations and product requirements.
- Set up a weekly message showing input data distribution from clients using grafana.
- Currently working on a proprietary novel lung nodule malignancy score that predicts the likelihood of a nodule being malignant in the ct scan. Exploring multiple avenues within this which I can't share more right now as its still early to reveal (without publications and patents). Working with PET CT, CT, biopsy reports, CT reports, and potentially xrays for this feature.
Tools remain the same as from stroke including clearml monai vision architectures etc. We also use safetensors here extensively.

Ask me relevant questions to improve upon this as I may have forgotten certain tools or ideas that I may have used. If you ask me some commonly used tools that one may use for this I can tell you so that you can update this. Also, feel free to modify the structure of the project so it's better to read.

 -->


#### #) Stroke and Trauma Imaging Intelligence (qER)
**Summary:** Progressed from a novice AI scientist to qER’s R&D lead by scaling supervised computer-vision programs across NCCT/CTA/trauma datasets, owning supervised fine-tuning and transfer-learning pipelines, and converting those models plus their experimentation stack into multi-region FDA/CE releases, peer-reviewed papers, patents, and the $100K Johnson & Johnson Japan QuickFire grant.
**Mission:** Convert the chaos of incoming stroke/trauma imaging into rapid, data-backed triage decisions—NCCT infarct core, CTA LVO, perfusion surrogates, trauma alerts—while equipping ER and hub-spoke teams with the context they need to cut door-to-needle time.

<details class="collapsible-point">
  <summary><strong>Clinical Coverage</strong>: <span class="collapsible-point__preview">MRI DWI, NCCT core/penumbra, CTA LVO, trauma suite</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Built and productionized models that span the entire acute stroke journey: NCCT acute/hyperacute infarct classification & segmentation, CTA large-vessel occlusion detection/localization, NCCT-derived perfusion surrogates (core/penumbra), ASPECTS scoring assist, gaze deviation assessment, plus trauma detections (intracranial hemorrhage classes, midline indicators, fractures via teammates) to cover the same ER workflow.
  - Early projects included a DWI/ADC infarct segmentation UNet (Dice ≈ 0.70) that served as my ML foundation even though it was later shelved, giving me MRI domain familiarity when CT-first models took over.
  - Partnered with product & hospital innovation teams to extend the suite into coordination tools that link spoke hospitals to thrombectomy hubs, standardize hand-offs, and shorten door-to-needle times—a differentiator beyond raw model outputs.
  - Curated ~140k NCCT studies (sourced via pan-India teleradiology partners) for classification models, carved out ~10k radiologist-annotated scans for all stroke/trauma segmentations, and spun up nimble ~1k-scan datasets for utility models (cranium classifier, intracranial volume) plus research/regulatory holdouts covering new geographies.
  - Designed and published a mechanical thrombectomy likelihood model that fuses NIHSS-like pre-clinical scores, demographics (age, last-known-well), and NCCT-derived biomarkers (infarct volume, ASPECTS). It now acts as an upstream signal for hub-and-spoke coordination and is published as a full paper.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Model Portfolio &amp; Metrics</strong>: <span class="collapsible-point__preview">Infarct AUC 0.85–0.92, LVO AUC 0.98, DSC 0.75+</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - **NCCT acute/hyperacute infarct**: ensemble of classification heads (AUC 0.85–0.92 on ~140k scans) plus segmentation models (Dice 0.30–0.75) using CNN, transformer, and hybrid encoder families (ResNet/SE-ResNet, ConvNeXt, EfficientNetV2, 3D SwinV2, 3D MaxViT) with UNet/UPerNet/ConvLSTM decoders; best variants are published and deployed.
  - **CTA LVO pipeline (patented & deployed globally)**: multi-stage stack combining cranium isolation, ANTsPy-based tilt correction, intracranial volume extraction, vascular-territory segmentation, MCA occlusion detection via 2D CNNs on MIPs, and ICA patch classifiers—achieving AUC ≈ 0.98 and segmentation Dice ≥ 0.95.
  - **Core & penumbra on NCCT**: novel segmentation leveraging CT-perfusion ground truth; currently in patent filing/clinical validation with Dice > 0.30 even against noisy perfusion labels, positioning NCCT-only workflows to mimic perfusion decisions.
  - **Gaze deviation estimation**: eye/lens segmentation (Dice 0.88) feeding geometric gaze-angle computation aligned with NIHSS; research published even though not commercialized yet.
  - **ASPECTS post-processing**: added region-level smoothing and rule-based corrections atop a colleague’s model, cutting mean absolute ASPECTS error by 36% (2.5 → 1.6).
  - **ICH classification assist**: co-designed augmentation strategies and ensemble logic for the hemorrhage detector that shipped inside qER Trauma.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Architecture &amp; Experimentation</strong>: <span class="collapsible-point__preview">2D/3D FCNs, transformers, MONAI, ClearML</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Ran large-scale sweeps across 2D FCNs, 3D FCNs, 2D backbones with 3D adaptors, transformer-only encoders (ViT, SwinV2), hybrid stacks like Swin-UNETR, and ConvLSTM heads to balance accuracy vs. latency for ER deployments.
  - Standardized experimentation on MONAI + ClearML plus an in-house `vision_architectures` library I authored to provide production-grade implementations of 3D transformer/convolutional networks that the open-source ecosystem lacked.
  - Built a stratified evaluation harness that auto-generates ROC/PR plots, per-stratum metrics, and threshold deltas between candidate models so stakeholders can see the clinical trade-offs quickly—slashing unmeasured but substantial iteration cycles.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Workflow &amp; Stakeholder Enablement</strong>: <span class="collapsible-point__preview">Hub-spoke orchestration, analysis toolkit</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Provided structured AI outputs, occlusion maps, and confidence overlays that platform teams wired into dashboards/notifications for spoke↔hub coordination, while I stayed focused on the underlying models.
  - Partnered with Johnson & Johnson Japan on deploying these outputs into their Smart Healthy Aging Initiative QuickFire pilots—winning the $100K grant and international recognition ([news](https://www.qure.ai/news_press_coverages/qure-ai-wins-japan-smart-healthy-aging-initiative-quickfire-challenge-organized-by-johnson-johnson-innovation), [press](https://www.auntminnie.com/clinical-news/ct/article/15633781/qureai-wins-japan-quickfire-challenge)).
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Regulatory &amp; Publication Footprint</strong>: <span class="collapsible-point__preview">FDA/CE wins, journals, patent</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Led the latest FDA 510(k) submission (CTA LVO) end-to-end—owning retrospective reader studies, operating-point selection (sensitivity/specificity), and documentation—which cleared in 3.5 months, our fastest turnaround ever.
  - Serve as primary owner for CE MDR/MDSAP and other regional filings; earlier FDA packages saw me in a supporting role, now I represent R&D on the pivotal ones.
  - Co-authored peer-reviewed papers and conference talks covering infarct detection, LVO detection, perfusion surrogates, gaze deviation, and the thrombectomy-likelihood model (ICCVW, WSC, ASFNR, etc.).
  - Named inventor on the U.S./India patent for automated LVO detection on CTA; additional IP filings (e.g., core/penumbra on NCCT) are underway.
  </div>
</details>

<details class="collapsible-point">
  <summary><strong>Role Evolution &amp; Collaboration</strong>: <span class="collapsible-point__preview">Novice → lead, mentoring juniors</span></summary>
  <div class="collapsible-point__content" markdown="1">
  - Started as a novice AI Scientist (full-time while still in school) with two mentors, rapidly took ownership of stroke ML deliverables, and was promoted directly to Level 2 upon graduation because I was already operating as a full-time contributor.
  - Drove cross-functional delivery with product managers, clinical advisors, data teams, and hospital partners to translate experimental models into regulated releases.
  - Continue to mentor newer scientists on experimentation hygiene, architecture choices, and deployment readiness, while transitioning some responsibilities to lung-cancer initiatives.
  </div>
</details>

<!-- Prompt:

Let's draft the Stroke and Trauma Imaging Intelligence section. Just like before, this website will mostly be visited by recruiters and colleagues, so write it accordingly. There is a separete resume that I am providing to recruiters where I will only include the main points concisely, so there are no such restrictions here, be as verbose as you would like. Make it professional and unambiguous while appealing to recruiters (i.e. HR as well as tech folks). 
I started of with this product when I joined the company. I was a newbie then so did not know much with very little machine learning experience. In this, the overarching problem statement is to detect stroke in a timely manner at emergency care departments in hospitals. Part of this detection involves accurate identification of stroke indicators on the NCCT scan, identification of large vessel occlusions on CTA scans, and possible predictions of perfusion parameters on NCCTs as best as possible. Apart from these machine learning models, I helped in building a platform to aid coordination between different stakeholders at the hospital to reduce door-to-needle times of the patient and enabling hub and spoke based models. Ther eis also a trauma suite which ties into this where intracranial bleeds, midline shift, mass effect, and cranium fractures are detected in an emergency setting using NCCT.
- Trained a semantic segmentation model using a basic UNet architecture to identify infarcts on head mri scans using dwi and adc scans. This was my first project and introduction to machine learning. The Dice coefficient was 0.7. This project was not continued further.
- Trained multiple acute infarct and hyperacute infarct classification models on NCCT. AUCs of 0.85-0.92. Trained multiple acute infarct and hyperacute infarct segmentation models on NCCT. Dice coefficients of 0.3-0.75. Used multiple architectures (CNN, transformer, and hybrid architectures: resnet, convnext, efficientnetv2, seresnet, 3d swinv2, 3d maxvit encoders; unet, upernet overall architectures, convlstm). The best of these models are published and currently in production.
- Trained a classiifcation + detection algorithm by stacking and combining five 2D based cnn based models and image registration using ants to identify and localize occlusions in the large vessels on head ct angiography scans. This is patented, published, and deployed across all sites. The first step involves cranium classification that isolates only the cranium region in an entire ct scan. Following this we perform registration for tilt correction and scan standardization. The second step involves segmenting the intracraniul volume of the head to get rid of bones, especially the carotid canal. The third step involves splitting the intracranial volume into different vascular territories (i.e. splitting it into different sections based on their source of blood eg. pca, aca, mca, etc.). The fourth step involves two models, one that detects occlusions in the mca region of the brain after taking a maximum intensity projection (MIP) along the z axis, and the other that classifies ica occlusion using a patch based classifier on each of the slices involving the ica. The average AUC of classification models is 0.98, DSC of segmentation models is 0.95+.
- Trained a core and penumbra segmentation model on NCCT with CT perfusion ground truth. Currently being patented, will then undergo clinical validation before being deployed. DSC of >0.3 (don't have exact number due to noisy ground truth, however DSC is definitely more than this). Completely novel idea that can change medical guidelines lobally if successful.
- Trained a gaze deviation model that identifies whether the patient is able to hold their gaze straight in the CT scan as part of NIHSS guidenlines that implies that preference of one sided-gaze is a symptom of stroke. Model segments the eye as well as the lens and obtains the angle of the gaze. DSC of 0.88. The presence of deviation in the scan has been published. This model is not deployed due to lack of interest as this is not standard protocol in the stroke pathway.
- Added post processing to an aspects model (trained by a colleague) that accurately segments the different aspects regions in the brain, reducing mean deviation of predicted ASPECT score by 36%.
- Assisted colleague in making intracranial hemorrhage classification model by helping with ensembling of multiple models with different types of data augmentations and architectures.
- Did not work on midline shift, mass effect, or cranial fracture models at all. Don't mention.
- Created framework that allowed fast testing of models based on different stratifications increasing development cycle speed (unmeasured). It has fast visualizations of roc curves, calculations of all classification metrics for different stratas defined dynamically along with threshold-based comparisons for two different models showing actual benefit of one model over the other.
- Worked on a grant from Johnson and Johnson Japan and won 100k usd in funding.
- Achieved multiple fda approvals, ce approvals, and other regulatory learances for multiple features of this product, published full-length research papers, and presented and multiple conference proceedings. Also have a patent registered in India and USA for the CTA product as mentioned before.

Ask me relevant questions to improve upon this as I may have forgotten certain tools or ideas that I may have used. If you ask me some commonly used tools that one may use for this I can tell you so that you can update this. Also, feel free to modify the structure of the project so it's better to read.

---

Instead of intern, say "novice" or something similar. In interviews I will be syaing that my title was "intern" only because I had still not graduated, however I was still working full-time at Qure which is why I was promoted directly to level 2 when I graduated.

Some more questions you may have:
Metrics precision: Do you have exact Dice or AUC numbers you'd like to cite for the core/penumbra model, or should we keep it as ">0.30"? Same for the ASPECTS improvement—was it "36% reduction in mean absolute error" or "36% reduction in incorrect scores"?
Tooling stack: Beyond MONAI, ClearML, and ANTsPy, did you use any other notable libraries (e.g., TorchIO, NiBabel, SimpleITK, nnU‑Net baseline comparisons)?
Data scale: Roughly how many scans or patients were you training on (e.g., "trained on X,000 NCCT studies from Y sites")? Even ballpark numbers add credibility.
Clinical validation: For the models that are FDA‑cleared, were there prospective or retrospective validation studies you contributed to (reader studies, sensitivity/specificity at specific operating points)?
Grant details: Was the J&J grant for a specific sub‑project (e.g., perfusion prediction, gaze deviation) or the overall platform? Any public info to link?
Hub‑spoke platform: Was your role purely on the AI models, or did you also contribute to the coordination‑platform code (e.g., dashboards, notification logic)?
Timeline: You mentioned ~3 years (intern Jul 2021 – presumably mid‑2024?). Should we note that explicitly, or leave it implicit via the Title History table?

Answers:
1. I only have >0.3 with 0.3 on noisy ground truth. It is 36% reduction in mean absolute error between actual ASPECTS and predicted ASPECTS.
2. there are a lot of libraries used throughout my time at qure. Listing all of them here, you can extract relevant ones and put here: albumentations, antspy, black, clearml, confidenceinterval, pycoverage, dataframe_image, deepdiff, efficientnet_pytorch, einops, fastparquet, flake8, gemini, google-genai, huggingface-hub, hydra-core, ipykernel, ipywidgets, isort, jupyter, loguru, matplotlib, mergedeep, monai, nbconvert, nbdev, numpy, numba, nvitop, omegaconf, onnx, opencv-python, openpyxl, pandas, pillow, plotly, polars, portkey-ai, pre-commit, prettytable, pydantic, pydicom, pymongo, pytest, pytest-cov, pytest-lazy-fixtures, lightning, redbrick, redbrick-sdk, requests, rich, safetensors, scikit-learn, scikit-image, scipy, seaborn, segmentation_models_pytorch, SimpleITK, slack_sdk, sphinx, tabulate, swifter, tensorboard, termcolor, timm, tokenizers, transformers, torch, torchmetrcs, torchsummary, torchvision, torchview, tqdm
3. Scale of data varied for each model. For classification we had about 140k NCCT scans from all over India (purchased from a teleradiology center so varied locations). For segmentations we obtained annotations ourselves from radiologists so we had about 10k scans which was a subset of the 140k scans. We also created a robust test set from various research studies and regulatory clearances. For utility models like cranium classifier and intracranial volume segmentation we only need around 1000 scans annotated which we easily did ourselves.
4. Yes the studies done for FDA clearances were done by us only with me taking lead in the latest one. This clearance was our fastest one ever with a turnaround time of 3.5 months from submitting the documents to getting cleared. Similarly I was lead on submissions for CE, MDR/MDSAP and other regulatory bodies. I only played an assisting role in all other FDA clearances.
5. This was granted for timely detection of stroke involving the NCCT infarct and CTA LVO models. It was for further development of these models and mostly for the entire platform. Public links: https://www.qure.ai/news_press_coverages/qure-ai-wins-japan-smart-healthy-aging-initiative-quickfire-challenge-organized-by-johnson-johnson-innovation https://www.auntminnie.com/clinical-news/ct/article/15633781/qureai-wins-japan-quickfire-challenge 
6. My role was primarily in AI models. The rest of the my contributions have already been mentioned under other projects such as data & annotations and production codebase and need not be specified here.
7. Need not mention here

Also, I also created a model that predicts the likelihood of a patient needing mechanical thrombectomy based on the pre-clinical stroke score (like NIHSS), clinical factors such as age, last known well time, etc., and the parameters obtained from the NCCT (eg. infarct volume, aspects score). This has currently been published as a full paper too. Add this to the file too if it makes sense.
Also the summary feels like it's talking too much about the problem statement and not enough of what I have done, especially from a technical angle. Shorten what has currently been written and talk more about the things I have done and learnt here from the perspective of a recruiter for AI scientists i.e. computer vision, problem solving, etc.

 -->


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



<!-- #### #) Generative Models
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
- Collaboration:  -->


### Publications
- Link to [All Publications]({{ site.baseurl }}{% link _tabs/publications.md %})
- Link to [Blog]({{ site.baseurl }}{% link _tabs/blog.md %})