"""
Example: Generate a sample presentation using the PPT helper functions.
Run this to verify the skill works correctly.
"""

import sys
import os

# Add the scripts directory to path so we can import helpers
sys.path.insert(0, os.path.dirname(__file__))

from ppt_helpers import (
    create_presentation, save_presentation,
    add_title_slide, add_section_slide, add_content_slide,
    add_two_column_slide, add_table_slide, add_stats_slide,
    add_thank_you_slide,
)


def main():
    prs = create_presentation(widescreen=True)

    # 1. Title slide
    add_title_slide(
        prs,
        title="Quarterly Business Review",
        subtitle="Q4 2025 Performance Summary  •  Prepared by Analytics Team",
    )

    # 2. Section divider
    add_section_slide(prs, "Key Highlights", section_number=1)

    # 3. Stats slide
    add_stats_slide(prs, "Performance at a Glance", [
        {"value": "$4.2M", "label": "Total Revenue"},
        {"value": "32%",   "label": "YoY Growth"},
        {"value": "1.2K",  "label": "New Customers"},
        {"value": "94%",   "label": "Retention Rate"},
    ])

    # 4. Content slide
    add_content_slide(prs, "Strategic Initiatives", [
        "Launched v3.0 platform with AI-powered analytics",
        "Expanded into 3 new international markets",
        "Reduced customer churn by 18% through proactive support",
        "Secured Series B funding of $25M",
        "Grew engineering team by 40%",
    ])

    # 5. Two-column comparison
    add_two_column_slide(
        prs,
        title="Product Comparison",
        left_title="Current Platform",
        left_items=[
            "Monolithic architecture",
            "Manual reporting",
            "Email-only support",
            "15-minute deploy cycles",
        ],
        right_title="Next-Gen Platform",
        right_items=[
            "Microservices architecture",
            "Real-time AI dashboards",
            "Omnichannel support",
            "Instant CI/CD deployments",
        ],
    )

    # 6. Table slide
    add_table_slide(
        prs,
        title="Regional Revenue Breakdown",
        headers=["Region", "Revenue", "Growth", "Market Share"],
        rows=[
            ["North America", "$2.1M", "+28%", "45%"],
            ["Europe",        "$1.2M", "+35%", "30%"],
            ["Asia Pacific",  "$0.6M", "+52%", "15%"],
            ["Latin America", "$0.3M", "+41%", "10%"],
        ],
    )

    # 7. Thank you slide
    add_thank_you_slide(
        prs,
        message="Thank You",
        contact="questions@company.com  •  company.com/analytics",
    )

    save_presentation(prs, "sample_presentation")


if __name__ == "__main__":
    main()
