"use client";

import { X, FileText, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    type: string;
    path?: string;
    uploaded?: boolean;
    uploadedId?: string;
}

interface ImagePreviewListProps {
    files: UploadedFile[];
    onRemove: (id: string) => void;
}

export function ImagePreviewList({ files, onRemove }: ImagePreviewListProps) {
    const [loadedPreviews, setLoadedPreviews] = useState<Set<string>>(new Set());

    const handleImageLoad = (id: string) => {
        setLoadedPreviews((prev) => new Set([...prev, id]));
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith("image/")) {
            return <ImageIcon className="h-8 w-8 text-primary" />;
        }
        return <FileText className="h-8 w-8 text-primary" />;
    };

    const getFileName = (file: File) => {
        if (file.name.length > 30) {
            return file.name.substring(0, 27) + "...";
        }
        return file.name;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    if (files.length === 0) return null;

    return (
        <div className="space-y-3 mt-4">
            {files.map((uploadedFile) => {
                const isImage = uploadedFile.file.type.startsWith("image/");

                return (
                    <div
                        key={uploadedFile.id}
                        className="group relative flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-primary/50 hover:shadow-sm transition-all duration-200"
                    >
                        {/* Preview/Icon */}
                        <div className="flex-shrink-0">
                            {isImage && uploadedFile.preview ? (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                                    <img
                                        src={uploadedFile.preview}
                                        alt={uploadedFile.file.name}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                                            loadedPreviews.has(uploadedFile.id) ? "opacity-100" : "opacity-0"
                                        }`}
                                        onLoad={() => handleImageLoad(uploadedFile.id)}
                                    />
                                    {!loadedPreviews.has(uploadedFile.id) && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center">
                                    {getFileIcon(uploadedFile.file)}
                                </div>
                            )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{getFileName(uploadedFile.file)}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{formatFileSize(uploadedFile.file.size)}</p>
                            {uploadedFile.uploaded && uploadedFile.path && (
                                <p className="text-xs text-green-600 mt-0.5 flex items-center gap-1 font-medium">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Uploaded ✓
                                </p>
                            )}
                        </div>

                        {/* Remove Button - show for all files, but with warning for uploaded ones */}
                        <button
                            type="button"
                            onClick={() => onRemove(uploadedFile.id)}
                            className="flex-shrink-0 p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Remove file"
                            title={uploadedFile.uploaded ? "Remove (will need to re-upload on next submit)" : "Remove file"}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
