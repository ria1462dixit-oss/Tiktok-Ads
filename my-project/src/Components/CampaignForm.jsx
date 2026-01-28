import { useState, useEffect } from "react";
import "./CampaignForm.css";

function CampaignForm({ onSessionExpired }) {
    const [musicError, setMusicError] = useState("");
    const [campaignName, setCampaignName] = useState("");
    const [objective, setObjective] = useState("Traffic");
    const [adText, setAdText] = useState("");
    const [cta, setCta] = useState("Shop Now");
    const [musicType, setMusicType] = useState("existing");
    const [musicId, setMusicId] = useState("");
    const [errors, setErrors] = useState({});
    const [systemError, setSystemError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (objective === "Conversions" && musicType === "none") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setErrors((prev) => ({
                ...prev,
                music: "Music is required for Conversion campaigns."
            }));
        } else {
            setErrors((prev) => ({ ...prev, music: null }));
        }
    }, [objective, musicType]);

    function validateForm() {
        const newErrors = {};

        if (!campaignName.trim()) {
            newErrors.campaignName = "Campaign name is required.";
        }

        if (!adText.trim()) {
            newErrors.adText = "Ad text is required.";
        } else if (adText.length > 100) {
            newErrors.adText = "Ad text must be 100 characters or less.";
        }

        if (musicType === "existing" && !musicId.trim()) {
            newErrors.music = "Music ID is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    function handleSubmit(e) {
        e.preventDefault();

        if (
            (musicType === "upload" && !uploadSuccess) ||
            (musicType === "existing" && (!musicId || !/^\d{8,12}$/.test(musicId))) ||
            (objective === "Conversions" && musicType === "none")
        ) {
            return;
        }

        if (!validateForm()) return;

        setShowSuccess(false);
        setSystemError("");
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);

            const fail = Math.random() < 0.3;

            if (fail) {
                setSystemError(
                    "Your session has expired or permissions are missing. Please reconnect your account."
                );
                onSessionExpired();
                return;
            }

            setShowSuccess(true);
        }, 2000);
    }


    return (
        <div className="form-page">
            <header className="form-header">
                <span className="logo">TIKTOK ADS</span>
                <div>  <span className="status-badge">● ACCOUNT CONNECTED</span>
                    <button className="btn" onClick={onSessionExpired}>  Disconnect</button></div>
            </header>

            {showSuccess && (
                <div className="success-banner">
                    <div className="success-left">
                        <span className="success-icon">✓</span>
                        <span>
                            Ad creative successfully submitted to TikTok Ads Manager!
                        </span>
                    </div>

                    <button
                        className="close-btn"
                        onClick={() => setShowSuccess(false)}
                    >
                        ×
                    </button>
                </div>
            )}

            {systemError && (
                <div className="system-error">
                    {systemError}
                </div>
            )}

            <main className="form-container">
                <form onSubmit={handleSubmit}>


                    <div className="grid">
                        <div>
                            <label>Campaign Name</label>
                            <input
                                type="text"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                            />
                            {errors.campaignName && (
                                <p className="error">{errors.campaignName}</p>
                            )}
                        </div>

                        <div>
                            <label>Campaign Objective</label>
                            <select
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                            >
                                <option>Traffic</option>
                                <option>Conversions</option>
                            </select>
                            <p className="hint">
                                Optimization: Recommended for e-commerce
                            </p>
                        </div>
                    </div>


                    <div>
                        <label>
                            Ad Text
                            <span
                                className={`counter ${adText.length > 100 ? "danger" : ""
                                    }`}
                            >
                                {adText.length}/100
                            </span>
                        </label>

                        <textarea
                            value={adText}
                            onChange={(e) => setAdText(e.target.value)}
                        />

                        {errors.adText && (
                            <p className="error">{errors.adText}</p>
                        )}
                    </div>

                    <div>
                        <label>Call to Action</label>
                        <select
                            value={cta}
                            onChange={(e) => setCta(e.target.value)}
                        >
                            <option>Shop Now</option>
                            <option>Learn More</option>
                            <option>Sign Up</option>
                        </select>
                    </div>

                    <div>
                        <label>Music Selection</label>

                        <div className="music-grid">
                            <button
                                type="button"
                                className={`tile ${musicType === "existing" ? "active" : ""}`}
                                onClick={() => {
                                    setMusicType("existing");
                                    setUploadSuccess(false);
                                    setMusicId("");
                                    setMusicError("");
                                }}
                            >
                                Existing ID
                                <span>Use a track ID from the library</span>
                            </button>

                            <button
                                type="button"
                                className={`tile ${musicType === "upload" ? "active" : ""}`}
                                onClick={() => {
                                    setMusicType("upload");
                                    setUploadSuccess(false);
                                    setMusicId("");
                                    setMusicError("");
                                }}
                            >
                                Custom Upload
                                <span>Upload your own audio</span>
                            </button>

                            <button
                                type="button"
                                className={`tile ${musicType === "none" ? "active" : ""}`}
                                onClick={() => {
                                    setMusicType("none");
                                    setUploadSuccess(false);
                                    setMusicId("");
                                    setMusicError("");
                                }}
                            >
                                No Music
                                <span>Proceed without audio</span>
                            </button>
                        </div>

                        {musicType === "existing" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter Music ID (8–12 digits)"
                                    value={musicId}
                                    onChange={(e) => setMusicId(e.target.value)}
                                    onBlur={() => {
                                        if (!/^\d{8,12}$/.test(musicId)) {
                                            setMusicError("Invalid Music ID format. Use 8–12 digits.");
                                        } else {
                                            setMusicError("");
                                        }
                                    }}
                                />
                                {musicError && <p className="error">{musicError}</p>}
                            </>
                        )}

                        {musicType === "upload" && (
                            <div className="upload-box">
                                {!uploadSuccess ? (
                                    <button
                                        type="button"
                                        className="upload-btn"
                                        disabled={isUploading}
                                        onClick={() => {
                                            setIsUploading(true);
                                            setMusicError("");
                                            setTimeout(() => {
                                                setIsUploading(false);
                                                setUploadSuccess(true);
                                                setMusicId(
                                                    Math.floor(100000000 + Math.random() * 900000000).toString()
                                                );
                                            }, 2000);
                                        }}
                                    >
                                        {isUploading ? "Uploading…" : "Simulate Upload"}
                                    </button>
                                ) : (
                                    <p className="upload-success">✅ Music uploaded successfully</p>
                                )}
                            </div>
                        )}

                        {musicType === "none" && (
                            <p className="hint">
                                {objective === "Conversions"
                                    ? "⚠️ Music is required for Conversion campaigns."
                                    : "Proceeding without background music."}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={
                            isSubmitting ||
                            (musicType === "upload" && !uploadSuccess) ||
                            (musicType === "existing" && !musicId)
                        }
                    >
                        {isSubmitting ? "Creating Campaign..." : "Create Ad Campaign"}
                    </button>

                    <p className="disclaimer">
                        By clicking “Create Ad Campaign”, you agree to TikTok’s advertising policies.
                    </p>
                </form>
            </main>
        </div>
    );
}

export default CampaignForm;
