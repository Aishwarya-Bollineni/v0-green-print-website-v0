"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Bell, Shield, Download, Trash2, Phone, Save } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  country: string
  city: string
  joinDate: string
  emissionUnit: string
  currency: string
  language: string
}

interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyReports: boolean
  achievementAlerts: boolean
  tipReminders: boolean
}

interface PrivacySettings {
  profileVisibility: string
  dataSharing: boolean
  analyticsOptIn: boolean
  marketingEmails: boolean
}

export function SettingsPanel() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    city: "San Francisco",
    joinDate: "January 2024",
    emissionUnit: "kg",
    currency: "USD",
    language: "en",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    achievementAlerts: true,
    tipReminders: false,
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    dataSharing: true,
    analyticsOptIn: true,
    marketingEmails: false,
  })

  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "privacy" | "data">("profile")

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    console.log("Saving profile:", profile)
    // Show success message
  }

  const handleExportData = () => {
    // In a real app, this would generate and download user data
    console.log("Exporting user data...")
  }

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    console.log("Delete account requested")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-8 h-8 text-primary" />
          Settings & Profile
        </h2>
        <p className="text-muted-foreground">Manage your account preferences and privacy settings.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "privacy", label: "Privacy", icon: Shield },
          { id: "data", label: "Data", icon: Download },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as any)}
              className="gap-2"
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </Button>
          )
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your personal details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/diverse-user-avatars.png" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator />

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={profile.country} onValueChange={(value) => setProfile({ ...profile, country: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emissionUnit">Emission Unit</Label>
                  <Select
                    value={profile.emissionUnit}
                    onValueChange={(value) => setProfile({ ...profile, emissionUnit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg CO₂)</SelectItem>
                      <SelectItem value="tons">Tons (t CO₂e)</SelectItem>
                      <SelectItem value="lbs">Pounds (lbs CO₂)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={profile.currency}
                    onValueChange={(value) => setProfile({ ...profile, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile({ ...profile, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Account Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your GreenPrint journey so far</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">8</div>
                  <div className="text-sm text-muted-foreground">Months Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,250</div>
                  <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be notified about your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser notifications for important updates</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Summary of your weekly progress</p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when you earn badges or reach milestones
                  </p>
                </div>
                <Switch
                  id="achievement-alerts"
                  checked={notifications.achievementAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, achievementAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tip-reminders">Daily Tip Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily eco-friendly tips and reminders</p>
                </div>
                <Switch
                  id="tip-reminders"
                  checked={notifications.tipReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, tipReminders: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Privacy Tab */}
      {activeTab === "privacy" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control your privacy and data sharing preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Profile Visibility</Label>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to all users</SelectItem>
                    <SelectItem value="friends">Friends Only - Visible to connections</SelectItem>
                    <SelectItem value="private">Private - Only visible to you</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Anonymous Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve GreenPrint by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-opt-in">Analytics Opt-in</Label>
                  <p className="text-sm text-muted-foreground">Allow analytics to help us understand app usage</p>
                </div>
                <Switch
                  id="analytics-opt-in"
                  checked={privacy.analyticsOptIn}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, analyticsOptIn: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive promotional emails and product updates</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={privacy.marketingEmails}
                  onCheckedChange={(checked) => setPrivacy({ ...privacy, marketingEmails: checked })}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Security Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Shield className="w-4 h-4" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Phone className="w-4 h-4" />
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Tab */}
      {activeTab === "data" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Data Management
              </CardTitle>
              <CardDescription>Export or delete your data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download a copy of all your data including carbon footprint history, achievements, and settings.
                  </p>
                  <Button onClick={handleExportData} variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                </div>

                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium mb-2 text-red-800">Delete Account</h4>
                  <p className="text-sm text-red-700 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button onClick={handleDeleteAccount} variant="destructive" className="gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Usage Summary</CardTitle>
              <CardDescription>Overview of your stored data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Carbon footprint entries</span>
                  <Badge variant="secondary">247 records</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Achievement data</span>
                  <Badge variant="secondary">6 badges</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Profile information</span>
                  <Badge variant="secondary">Complete</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Usage analytics</span>
                  <Badge variant="secondary">8 months</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
