package com.application.rtu.model;

public class CombinedFormData {

    private String section1_forward;
    private String section1_age;
    private String section2_name;
    private String section2_age;

    // Getters and Setters

    @Override
    public String toString() {
        return "CombinedFormData{" +
               "section1_forward='" + section1_forward + '\'' +
               ", section1_age='" + section1_age + '\'' +
               ", section2_name='" + section2_name + '\'' +
               ", section2_age='" + section2_age + '\'' +
               '}';
    }
}
