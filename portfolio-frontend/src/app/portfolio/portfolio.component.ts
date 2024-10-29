import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent implements OnInit {
  portfolioItems: any[] = [];
  portfolioItem: any = {
    title: '',
    description: '',
    imageUrl: '',
    link: ''
  };
  editingItemId: string | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.getPortfolioItems();
  }

  getPortfolioItems() {
    this.portfolioService.getPortfolioItems().subscribe(
      (items) => {
        this.portfolioItems = items;
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  addPortfolioItem() {
    if (this.editingItemId) {
      this.portfolioService.updatePortfolioItem(this.editingItemId, this.portfolioItem).subscribe(
        (response) => {
          console.log('Item updated successfully:', response);
          this.resetForm();
          this.getPortfolioItems();
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
    } else {
      this.portfolioService.addPortfolioItem(this.portfolioItem).subscribe(
        (response) => {
          console.log('Item added successfully:', response);
          this.resetForm();
          this.getPortfolioItems();
        },
        (error) => {
          console.error('Error adding item:', error);
        }
      );
    }
  }

  editPortfolioItem(item: any) {
    this.portfolioItem = { ...item };
    this.editingItemId = item._id; // Set the ID of the item being edited
  }

  deletePortfolioItem(id: string) {
    this.portfolioService.deletePortfolioItem(id).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.getPortfolioItems();
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  resetForm() {
    this.portfolioItem = { title: '', description: '', imageUrl: '', link: '' };
    this.editingItemId = null; // Clear the editing ID
  }
}
